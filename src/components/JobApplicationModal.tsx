import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface JobApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const createJobApplicationSchema = (language: string) => z.object({
  firstName: z.string()
    .trim()
    .min(1, language === 'bg' ? 'Името е задължително' : 'First name is required')
    .max(50, language === 'bg' ? 'Името трябва да е под 50 символа' : 'First name must be less than 50 characters'),
  lastName: z.string()
    .trim()
    .min(1, language === 'bg' ? 'Фамилията е задължителна' : 'Last name is required')
    .max(50, language === 'bg' ? 'Фамилията трябва да е под 50 символа' : 'Last name must be less than 50 characters'),
  email: z.string()
    .trim()
    .min(1, language === 'bg' ? 'Имейлът е задължителен' : 'Email is required')
    .email(language === 'bg' ? 'Моля, въведете валиден имейл' : 'Please enter a valid email address')
    .max(255, language === 'bg' ? 'Имейлът трябва да е под 255 символа' : 'Email must be less than 255 characters'),
  phone: z.string()
    .trim()
    .max(20, language === 'bg' ? 'Телефонът трябва да е под 20 символа' : 'Phone must be less than 20 characters')
    .optional()
    .or(z.literal('')),
  position: z.string()
    .min(1, language === 'bg' ? 'Моля, изберете позиция' : 'Please select a position'),
  experience: z.string()
    .min(1, language === 'bg' ? 'Моля, изберете ниво на опит' : 'Please select experience level'),
  portfolioUrl: z.string()
    .trim()
    .url(language === 'bg' ? 'Моля, въведете валиден URL' : 'Please enter a valid URL')
    .max(500, language === 'bg' ? 'URL трябва да е под 500 символа' : 'URL must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  coverLetter: z.string()
    .trim()
    .min(50, language === 'bg' ? 'Мотивационното писмо трябва да е поне 50 символа' : 'Cover letter must be at least 50 characters')
    .max(5000, language === 'bg' ? 'Мотивационното писмо трябва да е под 5000 символа' : 'Cover letter must be less than 5000 characters'),
});

type JobApplicationFormData = z.infer<ReturnType<typeof createJobApplicationSchema>>;

const JobApplicationModal = ({ open, onOpenChange }: JobApplicationModalProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const jobApplicationSchema = createJobApplicationSchema(language);

  const form = useForm<JobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      portfolioUrl: '',
      coverLetter: '',
    },
  });

  const positions = [
    { value: 'frontend', label: language === 'bg' ? 'Frontend разработчик' : 'Frontend Developer' },
    { value: 'backend', label: language === 'bg' ? 'Backend разработчик' : 'Backend Developer' },
    { value: 'fullstack', label: language === 'bg' ? 'Fullstack разработчик' : 'Fullstack Developer' },
    { value: 'designer', label: language === 'bg' ? 'UI/UX дизайнер' : 'UI/UX Designer' },
    { value: 'pm', label: language === 'bg' ? 'Продуктов мениджър' : 'Product Manager' },
    { value: 'other', label: language === 'bg' ? 'Друго' : 'Other' },
  ];

  const experienceLevels = [
    { value: 'junior', label: language === 'bg' ? 'Junior (0-2 години)' : 'Junior (0-2 years)' },
    { value: 'mid', label: language === 'bg' ? 'Mid-level (2-5 години)' : 'Mid-level (2-5 years)' },
    { value: 'senior', label: language === 'bg' ? 'Senior (5+ години)' : 'Senior (5+ years)' },
  ];

  const onSubmit = async (data: JobApplicationFormData) => {
    try {
      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          type: 'job-application',
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone || undefined,
          position: data.position,
          experience: data.experience,
          portfolioUrl: data.portfolioUrl || undefined,
          coverLetter: data.coverLetter,
        },
      });

      if (error) throw error;

      toast({
        title: language === 'bg' ? 'Успешно изпратено!' : 'Application Submitted!',
        description: language === 'bg' 
          ? 'Благодарим ви за кандидатурата. Ще се свържем с вас скоро.' 
          : 'Thank you for your application. We will get back to you soon.',
      });

      form.reset();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast({
        title: language === 'bg' ? 'Грешка' : 'Error',
        description: language === 'bg' 
          ? 'Възникна проблем при изпращането. Моля, опитайте отново.' 
          : 'There was a problem submitting your application. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold">
            {language === 'bg' ? 'Кандидатствай за позиция' : 'Apply for a Position'}
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-0 top-0 p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'bg' ? 'Име' : 'First Name'} *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={language === 'bg' ? 'Въведете име' : 'Enter first name'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'bg' ? 'Фамилия' : 'Last Name'} *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={language === 'bg' ? 'Въведете фамилия' : 'Enter last name'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'bg' ? 'Имейл' : 'Email'} *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder={language === 'bg' ? 'Въведете имейл' : 'Enter email'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'bg' ? 'Телефон' : 'Phone'}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder={language === 'bg' ? 'Въведете телефон' : 'Enter phone number'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Position & Experience */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'bg' ? 'Желана позиция' : 'Desired Position'} *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'bg' ? 'Изберете позиция' : 'Select position'} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {positions.map((pos) => (
                          <SelectItem key={pos.value} value={pos.value}>
                            {pos.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'bg' ? 'Опит' : 'Experience Level'} *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'bg' ? 'Изберете ниво' : 'Select level'} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Portfolio URL */}
            <FormField
              control={form.control}
              name="portfolioUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'bg' ? 'Портфолио / LinkedIn URL' : 'Portfolio / LinkedIn URL'}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="url"
                      placeholder="https://"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover Letter */}
            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'bg' ? 'Мотивационно писмо' : 'Cover Letter'} *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={language === 'bg' 
                        ? 'Разкажете ни за себе си и защо искате да работите с нас...' 
                        : 'Tell us about yourself and why you want to work with us...'}
                      className="min-h-[150px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {language === 'bg' ? 'Изпращане...' : 'Submitting...'}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {language === 'bg' ? 'Изпрати кандидатурата' : 'Submit Application'}
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationModal;
