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

  const isLoading = appointmentsQuery.isLoading;
  const isError = appointmentsQuery.isError;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/40 backdrop-blur">
        <div className="container mx-auto flex flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide">Admin Area</p>
            <h1 className="text-2xl font-semibold">Appointments</h1>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/">← Back to website</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        {isLoading ? (
          <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
            Loading appointments…
          </div>
        ) : isError ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-8 text-center text-destructive">
            We could not load appointments. Please refresh to try again.
          </div>
        ) : appointments.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
            No appointments scheduled yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
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
                    <TableRow key={id || appointment.scheduledAt}>
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
