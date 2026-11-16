import * as RadixAccordion from '@radix-ui/react-accordion';
import chevronUp from '../assets/shared/chevron-up-faq.svg';
import chevronDown from '../assets/shared/chevron-down-faq.svg';

/** Only the first answer is written in Figma (1894:7927); the others follow the feature copy on the page. */
const FAQS = [
  { q: 'What details are stored in each deal profile?', a: 'Every deal can capture the company, contacts, owner, pipeline stage, value, and commercial details in one place.' },
  { q: 'Can I monitor pipeline performance in real time?', a: 'Yes. Live dashboards summarise deal volume, pipeline value and conversion rates, with performance trends you can export for reporting.' },
  { q: 'How does the platform support structured sales growth?', a: 'You define sales pipelines, reusable deal stages and business streams, so every opportunity follows the same path from qualification to closure.' },
  { q: 'Is customer data protected for enterprise teams?', a: 'Data is protected with role-based access controls, end-to-end encryption and compliance-ready audit trails.' },
  { q: 'Can I track budgets and team targets?', a: 'Plan budgets by period and department, distribute targets across teams, and measure achievement against closed deals.' },
  { q: 'How does collaboration work across teams?', a: 'Record contributors and departments on every deal, review collaboration patterns, and export insights for reporting.' },
];

/**
 * FAQ (Figma `faq-section`, 1894:7916). One row open at a time; the open row gets the red-tint border and the
 * red chevron-up, closed rows the grey chevron-down. Radix handles keyboard and ARIA.
 */
export function Faq() {
  return (
    <section className="flex flex-col items-center gap-10 px-50 py-20" aria-labelledby="faq-title">
      <div className="flex w-site-faq flex-col gap-4">
        <h2 id="faq-title" className="font-display text-site-section leading-120 text-site-ink">Frequently Asked Questions</h2>
        <p className="text-site-lead leading-150 text-text-icon-strong">
          Everything you need to know about managing deals, tracking performance, and keeping sales data secure.
        </p>
      </div>
      <RadixAccordion.Root type="single" collapsible defaultValue="faq-0" className="flex w-site-faq flex-col gap-4">
        {FAQS.map((f, i) => (
          <RadixAccordion.Item
            key={f.q}
            value={`faq-${i}`}
            className="group rounded-xl border border-border-modal bg-surface-default data-[state=open]:border-site-red-tint"
          >
            <RadixAccordion.Header>
              <RadixAccordion.Trigger className="flex w-full items-center gap-3 rounded-xl p-5 text-left group-data-[state=open]:pb-4 text-site-lead font-semibold text-site-ink focus-visible:outline-none focus-visible:shadow-focus">
                <span className="flex-1">{f.q}</span>
                <img src={chevronUp} alt="" className="hidden size-5 group-data-[state=open]:block" />
                <img src={chevronDown} alt="" className="block size-5 group-data-[state=open]:hidden" />
              </RadixAccordion.Trigger>
            </RadixAccordion.Header>
            <RadixAccordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <p className="px-5 pb-5 text-site-lead leading-150 text-text-icon-strong">{f.a}</p>
            </RadixAccordion.Content>
          </RadixAccordion.Item>
        ))}
      </RadixAccordion.Root>
    </section>
  );
}
