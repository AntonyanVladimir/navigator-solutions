import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { de, enUS } from 'date-fns/locale';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface BookingFormData {
  service: string;
  date: Date;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const AVAILABLE_TIMES = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00'
];

export const BookingDialog = ({ open, onOpenChange }: BookingDialogProps) => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormData>({
    defaultValues: {
      service: '',
      date: undefined,
      time: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Booking data:', data);
    setIsSubmitting(false);
    onOpenChange(false);
    setStep(1);
    form.reset();
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleClose = () => {
    onOpenChange(false);
    setStep(1);
    form.reset();
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">{t('booking.step1.title')}</h3>
        <p className="text-muted-foreground">{t('booking.step1.subtitle')}</p>
      </div>
      
      <FormField
        control={form.control}
        name="service"
        rules={{ required: t('booking.validation.service') }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('booking.service.label')}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 gap-3"
              >
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="ai-consulting" id="ai-consulting" />
                  <label htmlFor="ai-consulting" className="flex-1 cursor-pointer">
                    <div className="font-medium">{t('services.ai.title')}</div>
                    <div className="text-sm text-muted-foreground">{t('booking.service.ai.duration')}</div>
                  </label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="web-development" id="web-development" />
                  <label htmlFor="web-development" className="flex-1 cursor-pointer">
                    <div className="font-medium">{t('services.web.title')}</div>
                    <div className="text-sm text-muted-foreground">{t('booking.service.web.duration')}</div>
                  </label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="saas-development" id="saas-development" />
                  <label htmlFor="saas-development" className="flex-1 cursor-pointer">
                    <div className="font-medium">{t('services.saas.title')}</div>
                    <div className="text-sm text-muted-foreground">{t('booking.service.saas.duration')}</div>
                  </label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">{t('booking.step2.title')}</h3>
        <p className="text-muted-foreground">{t('booking.step2.subtitle')}</p>
      </div>

      <FormField
        control={form.control}
        name="date"
        rules={{ required: t('booking.validation.date') }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('booking.date.label')}</FormLabel>
            <FormControl>
              <CalendarComponent
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date() || date.getDay() === 0 || date.getDay() === 6
                }
                locale={language === 'de' ? de : enUS}
                className="rounded-md border pointer-events-auto mx-auto"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch('date') && (
        <FormField
          control={form.control}
          name="time"
          rules={{ required: t('booking.validation.time') }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('booking.time.label')}</FormLabel>
              <FormControl>
                <div className="grid grid-cols-3 gap-2">
                  {AVAILABLE_TIMES.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={field.value === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => field.onChange(time)}
                      className="flex items-center gap-1"
                    >
                      <Clock className="h-3 w-3" />
                      {time}
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">{t('booking.step3.title')}</h3>
        <p className="text-muted-foreground">{t('booking.step3.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          rules={{ required: t('booking.validation.firstName') }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('booking.firstName.label')}</FormLabel>
              <FormControl>
                <Input placeholder={t('booking.firstName.placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          rules={{ required: t('booking.validation.lastName') }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('booking.lastName.label')}</FormLabel>
              <FormControl>
                <Input placeholder={t('booking.lastName.placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="email"
        rules={{ 
          required: t('booking.validation.email'),
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t('booking.validation.emailFormat')
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('booking.email.label')}</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder={t('booking.email.placeholder')} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('booking.phone.label')}</FormLabel>
              <FormControl>
                <Input placeholder={t('booking.phone.placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('booking.company.label')}</FormLabel>
              <FormControl>
                <Input placeholder={t('booking.company.placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('booking.message.label')}</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t('booking.message.placeholder')} 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Summary */}
      {form.watch('service') && form.watch('date') && form.watch('time') && (
        <div className="p-4 bg-accent/30 rounded-lg">
          <h4 className="font-medium mb-2">{t('booking.summary.title')}</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {t(`services.${form.watch('service').replace('-', '.')}.title`)}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {form.watch('date') && format(form.watch('date'), 'PPP', {
                locale: language === 'de' ? de : enUS
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {form.watch('time')}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t('booking.title')}
          </DialogTitle>
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step >= stepNumber
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`w-8 h-0.5 transition-colors ${
                        step > stepNumber ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}

            <div className="flex justify-between pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                {t('booking.buttons.previous')}
              </Button>

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={
                    (step === 1 && !form.watch('service')) ||
                    (step === 2 && (!form.watch('date') || !form.watch('time')))
                  }
                  className="flex items-center gap-2"
                >
                  {t('booking.buttons.next')}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      {t('booking.buttons.submitting')}
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4" />
                      {t('booking.buttons.submit')}
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};