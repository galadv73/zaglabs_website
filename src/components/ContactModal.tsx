import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const createContactSchema = (language: string) => z.object({
  name: z.string()
    .trim()
    .min(1, language === 'bg' ? 'Името е задължително' : 'Name is required')
    .max(100, language === 'bg' ? 'Името трябва да е под 100 символа' : 'Name must be less than 100 characters'),
  email: z.string()
    .trim()
    .min(1, language === 'bg' ? 'Имейлът е задължителен' : 'Email is required')
    .email(language === 'bg' ? 'Моля, въведете валиден имейл' : 'Please enter a valid email address')
    .max(255, language === 'bg' ? 'Имейлът трябва да е под 255 символа' : 'Email must be less than 255 characters'),
  company: z.string()
    .trim()
    .max(100, language === 'bg' ? 'Името на компанията трябва да е под 100 символа' : 'Company name must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  subject: z.string()
    .min(1, language === 'bg' ? 'Моля, изберете тема' : 'Please select a subject'),
  message: z.string()
    .trim()
    .min(10, language === 'bg' ? 'Съобщението трябва да е поне 10 символа' : 'Message must be at least 10 characters')
    .max(2000, language === 'bg' ? 'Съобщението трябва да е под 2000 символа' : 'Message must be less than 2000 characters'),
});

type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const contactSchema = createContactSchema(language);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
    },
  });

  const subjects = [
    { value: 'general', label: language === 'bg' ? 'Общо запитване' : 'General Inquiry' },
    { value: 'project', label: language === 'bg' ? 'Нов проект' : 'New Project' },
    { value: 'partnership', label: language === 'bg' ? 'Партньорство' : 'Partnership' },
    { value: 'support', label: language === 'bg' ? 'Поддръжка' : 'Support' },
    { value: 'other', label: language === 'bg' ? 'Друго' : 'Other' },
  ];

  const onSubmit = async (data: ContactFormData) => {
    try {
      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          type: 'contact',
          name: data.name,
          email: data.email,
          company: data.company || undefined,
          subject: data.subject,
          message: data.message,
        },
      });

      if (error) throw error;

      toast({
        title: language === 'bg' ? 'Съобщението е изпратено!' : 'Message Sent!',
        description: language === 'bg' 
          ? 'Благодарим ви за съобщението. Ще се свържем с вас скоро.' 
          : 'Thank you for your message. We will get back to you soon.',
      });

      form.reset();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: language === 'bg' ? 'Грешка' : 'Error',
        description: language === 'bg' 
          ? 'Възникна проблем при изпращането. Моля, опитайте отново.' 
          : 'There was a problem sending your message. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold">
            {language === 'bg' ? 'Свържете се с нас' : 'Contact Us'}
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-0 top-0 p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </DialogHeader>

        <p className="text-muted-foreground text-sm mb-4">
          {language === 'bg' 
            ? 'Имате въпрос или искате да обсъдим вашия проект? Изпратете ни съобщение.' 
            : 'Have a question or want to discuss your project? Send us a message.'}
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name & Email */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'bg' ? 'Име' : 'Name'} *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={language === 'bg' ? 'Вашето име' : 'Your name'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        placeholder={language === 'bg' ? 'Вашият имейл' : 'Your email'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Company */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'bg' ? 'Компания' : 'Company'}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={language === 'bg' ? 'Име на компания (по избор)' : 'Company name (optional)'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subject */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'bg' ? 'Тема' : 'Subject'} *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'bg' ? 'Изберете тема' : 'Select a subject'} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.value} value={subject.value}>
                          {subject.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'bg' ? 'Съобщение' : 'Message'} *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={language === 'bg' 
                        ? 'Разкажете ни повече за вашия проект или въпрос...' 
                        : 'Tell us more about your project or question...'}
                      className="min-h-[120px] resize-none"
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
                  {language === 'bg' ? 'Изпращане...' : 'Sending...'}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {language === 'bg' ? 'Изпрати съобщение' : 'Send Message'}
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
