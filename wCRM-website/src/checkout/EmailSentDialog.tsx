import { SiteDialogContent, SiteDialogRoot, SiteDialogTitle } from './SiteDialog';
import check3d from '../assets/checkout/success-check-3d.svg';

/** "Success! Check Your Email" (Figma `successful popup`, 372:3583). The glyph sits inset inside a 150px box (372:3586). */
export function EmailSentDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <SiteDialogRoot open={open} onOpenChange={onOpenChange}>
      <SiteDialogContent className="size-site-success-popup items-center justify-center border-0" description="We emailed you a sign-in link and a verification code.">
        <div className="flex w-site-success-stack flex-col items-center gap-11.5">
          <div className="relative size-site-success-icon overflow-hidden">
            <img src={check3d} alt="" className="absolute" style={{ inset: '13.49% 6.96% 13.5% 6.95%' }} />
          </div>
          <div className="flex flex-col items-center gap-2.5 whitespace-nowrap capitalize">
            <SiteDialogTitle className="text-site-success text-text-link-bright">Success!</SiteDialogTitle>
            <p className="text-heading-xl font-medium text-text-faint">Check your email</p>
          </div>
        </div>
      </SiteDialogContent>
    </SiteDialogRoot>
  );
}
