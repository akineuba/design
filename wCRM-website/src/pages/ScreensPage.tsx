import { FullShot, SHOTS, type ShotId } from '../components/MarketingShots';
import { APP_FRAME } from '../components/app-screens';

/**
 * Export sheet for the concept page's product shots (/concept/screens): each full-page app window (sidebar and
 * content, no top bar, as in "See it at work") at its native 1617 × 797, one under another, so they can be captured
 * as PNGs. The cropped and inset versions are captured from /concept itself, where they are composed.
 */
export function ScreensPage() {
  return (
    <main className="flex flex-col gap-10 bg-surface-canvas p-10">
      {(Object.keys(SHOTS) as ShotId[]).map((id) => (
        <figure key={id} className="flex flex-col gap-3">
          <figcaption className="text-label text-text-secondary">{SHOTS[id].label}</figcaption>
          <FullShot id={id} header={false} className="shadow-lg" style={{ width: APP_FRAME.width }} />
        </figure>
      ))}
    </main>
  );
}
