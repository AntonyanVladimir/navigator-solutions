import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/sonner';
import {
  deleteApiManageAppointmentsId,
  getApiManageAppointments,
} from '@/lib/api/generated';
import type { AppointmentDto, AppointmentType } from '@/lib/api/model';

const formatAppointmentType = (type?: AppointmentType | null) => {
  switch (type) {
    case 'AiConsulting':
      return 'AI Consulting';
    case 'WebDevelopment':
      return 'Web Development';
    case 'SaasDevelopment':
      return 'SaaS Development';
    default:
      return 'Unknown';
  }
};

const formatSchedule = (scheduledAt?: string) => {
  if (!scheduledAt) {
    return '—';
  }

  const date = new Date(scheduledAt);
  if (Number.isNaN(date.getTime())) {
    return scheduledAt;
  }

  return format(date, 'PPpp');
};

const Admin = () => {
  const queryClient = useQueryClient();
  const [pendingId, setPendingId] = useState<number | null>(null);
  console.log('Rendering Admin component');
  const appointmentsQuery = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const response = await getApiManageAppointments();
      console.log('Fetched appointments:', response);
      const list = response.data;
      return Array.isArray(list) ? list : [];
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (id: number) => {
      await deleteApiManageAppointmentsId(id);
    },
    onSuccess: () => {
      toast.success('Appointment cancelled');
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: (error: unknown) => {
      console.error('Failed to cancel appointment', error);
      toast.error('Unable to cancel appointment. Please try again.');
    },
  });

  const handleCancel = (id: number) => {
    setPendingId(id);
    cancelMutation.mutate(id, {
      onSettled: () => setPendingId(null),
    });
  };

  const appointments = useMemo<AppointmentDto[]>(() => {
    if (!appointmentsQuery.data?.length) {
      return [];
    }

    return [...appointmentsQuery.data].sort((a, b) => {
      const dateA = a.scheduledAt ? new Date(a.scheduledAt).getTime() : 0;
      const dateB = b.scheduledAt ? new Date(b.scheduledAt).getTime() : 0;
      return dateA - dateB;
    });
  }, [appointmentsQuery.data]);

  const stats = useMemo(() => {
    const total = appointments.length;
    const now = Date.now();
    const futureAppointments = appointments.filter(
      (appointment) =>
        appointment.scheduledAt && new Date(appointment.scheduledAt).getTime() > now
    );
    const next = futureAppointments[0] ?? null;

    return {
      total,
      upcoming: futureAppointments.length,
      next,
    };
  }, [appointments]);

  const isLoading = appointmentsQuery.isLoading;
  const isError = appointmentsQuery.isError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background text-foreground">
      <header className="border-b border-border/60 bg-gradient-to-r from-emerald-500/15 via-primary/10 to-transparent backdrop-blur supports-[backdrop-filter]:backdrop-blur">
        <div className="container mx-auto flex flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] px-20 text-muted-foreground">
              Admin Area
            </p>
            <h1 className="text-3xl font-semibold tracking-tight px-20">Appointments</h1>
          </div>
          <Button variant="ghost" asChild className="hover:bg-primary/10 hover:text-primary">
            <Link to="/">← Back to website</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-20 py-10 space-y-8">
        {!isLoading && !isError && (
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500 dark:text-emerald-300">
                Total Appointments
              </p>
              <p className="mt-2 text-3xl font-semibold text-emerald-700 dark:text-emerald-100">
                {stats.total}
              </p>
            </div>
            <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-500 dark:text-sky-300">
                Upcoming
              </p>
              <p className="mt-2 text-3xl font-semibold text-sky-700 dark:text-sky-100">
                {stats.upcoming}
              </p>
              <p className="text-xs text-sky-600/80 dark:text-sky-200/80">
                Counting appointments scheduled in the future
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm sm:col-span-2 xl:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Next Appointment
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {stats.next ? formatSchedule(stats.next.scheduledAt) : '—'}
              </p>
              <p className="text-sm text-muted-foreground">
                {stats.next ? formatAppointmentType(stats.next.type) : 'No upcoming bookings'}
              </p>
            </div>
          </section>
        )}

        {isLoading ? (
          <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
            Loading appointments…
          </div>
        ) : isError ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-8 text-center text-destructive">
            We could not load appointments. Please refresh to try again.
          </div>
        ) : appointments.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border/70 bg-card/70 p-8 text-center text-muted-foreground">
            No appointments scheduled yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border/60 bg-card/90 shadow-xl">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[140px]">Scheduled at</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Caller</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => {
                  const id = typeof appointment.id === 'number' ? appointment.id : null;
                  const isCancelling = cancelMutation.isPending && pendingId === id;
                  const durationLabel =
                    typeof appointment.durationInMinutes === 'number'
                      ? `${appointment.durationInMinutes} min`
                      : '—';

                  return (
                    <TableRow
                      key={id || appointment.scheduledAt}
                      className="transition-colors hover:bg-muted/40"
                    >
                      <TableCell className="font-medium">
                        {formatSchedule(appointment.scheduledAt)}
                      </TableCell>
                      <TableCell>{formatAppointmentType(appointment.type)}</TableCell>
                      <TableCell>{appointment.title ?? '—'}</TableCell>
                      <TableCell>
                        {[appointment.callerFirstName, appointment.callerLastName]
                          .filter(Boolean)
                          .join(' ') || '—'}
                      </TableCell>
                      <TableCell>{appointment.contactEmail ?? '—'}</TableCell>
                      <TableCell>{durationLabel}</TableCell>
                      <TableCell className="max-w-sm truncate">
                        {appointment.notes ?? '—'}
                      </TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={isCancelling || id === null}
                            >
                              {isCancelling ? 'Cancelling…' : 'Cancel'}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancel appointment?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove the appointment scheduled for{' '}
                                {formatSchedule(appointment.scheduledAt)}. This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel disabled={isCancelling}>
                                Keep appointment
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  if (id !== null) {
                                    handleCancel(id);
                                  }
                                }}
                                disabled={isCancelling || id === null}
                              >
                                {isCancelling ? 'Cancelling…' : 'Confirm cancel'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
