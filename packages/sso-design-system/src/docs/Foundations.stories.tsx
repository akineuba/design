import type { Meta, StoryObj } from '@storybook/react';
import { colorGroups, radii, shadows, spacing, typeScale } from '../tokens/tokens';

const meta: Meta = { title: 'Foundations', parameters: { layout: 'fullscreen' } };
export default meta;

const wrap = { padding: 32, display: 'flex', flexDirection: 'column' as const, gap: 32 };
const h = { margin: '0 0 12px', fontSize: 18, fontWeight: 700, color: 'var(--sso-color-fg-ink)' };

export const Colors: StoryObj = {
  render: () => (
    <div className="sso-root" style={wrap}>
      {Object.entries(colorGroups).map(([group, colors]) => (
        <section key={group}>
          <h2 style={h}>{group}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
            {Object.entries(colors).map(([name, hex]) => (
              <div key={name} style={{ border: '1px solid var(--sso-color-line)', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
                <div style={{ height: 64, background: hex, borderBottom: '1px solid var(--sso-color-line)' }} />
                <div style={{ padding: '8px 10px' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--sso-color-fg-ink)' }}>--sso-color-{name}</div>
                  <div style={{ fontSize: 12, color: 'var(--sso-color-fg-muted)', fontFamily: 'var(--sso-font-mono)' }}>{hex}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

export const Typography: StoryObj = {
  render: () => (
    <div className="sso-root" style={wrap}>
      <section>
        <h2 style={h}>Inter, everywhere</h2>
        <p style={{ margin: 0, color: 'var(--sso-color-fg-subtle)' }}>
          One family for the whole portal: headings, navigation, body, tables and sign-in. Use tabular numerals (<code>.sso-num</code>) for figures.
        </p>
      </section>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          {typeScale.map((t) => (
            <tr key={t.token} style={{ borderBottom: '1px solid var(--sso-color-line-subtle)' }}>
              <td style={{ padding: '12px 0', width: 140, fontSize: 12, color: 'var(--sso-color-fg-muted)', fontFamily: 'var(--sso-font-mono)' }}>
                {t.token} · {t.px}/{t.weight}
              </td>
              <td style={{ padding: '12px 0', fontSize: t.px, fontWeight: t.weight, color: 'var(--sso-color-fg-ink)', textTransform: t.token.endsWith('xs') ? 'uppercase' : undefined, letterSpacing: t.px >= 24 ? '-0.015em' : t.token.endsWith('xs') ? '0.04em' : undefined }}>
                Subscription management
              </td>
              <td style={{ padding: '12px 0', fontSize: 13, color: 'var(--sso-color-fg-muted)' }}>{t.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

export const RadiusSpacingElevation: StoryObj = {
  name: 'Radius, spacing & elevation',
  render: () => (
    <div className="sso-root" style={wrap}>
      <section>
        <h2 style={h}>Radius</h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {Object.entries(radii).map(([k, v]) => (
            <div key={k} style={{ textAlign: 'center', fontSize: 12, color: 'var(--sso-color-fg-muted)' }}>
              <div style={{ width: 88, height: 64, borderRadius: v, background: 'var(--sso-color-primary-subtle)', border: '1px solid var(--sso-color-primary-border)', marginBottom: 6 }} />
              {k} · {v === 9999 ? 'full' : `${v}px`}
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: 'var(--sso-color-fg-muted)' }}>md (8) buttons, inputs, nav · lg (12) cards, tables · xl (16) accordions, dialogs.</p>
      </section>
      <section>
        <h2 style={h}>Spacing (4px grid)</h2>
        {spacing.map((s) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, fontSize: 12, color: 'var(--sso-color-fg-muted)' }}>
            <span style={{ width: 40, fontFamily: 'var(--sso-font-mono)' }}>{s}px</span>
            <span style={{ width: s * 4, height: 12, background: 'var(--sso-color-primary)', borderRadius: 3 }} />
          </div>
        ))}
      </section>
      <section>
        <h2 style={h}>Elevation</h2>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {Object.entries(shadows).map(([k, v]) => (
            <div key={k} style={{ width: 160, height: 96, borderRadius: 12, background: '#fff', boxShadow: v, border: k === 'focus' ? '1px solid var(--sso-color-primary)' : '1px solid var(--sso-color-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'var(--sso-color-fg-subtle)' }}>
              shadow-{k}
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};
