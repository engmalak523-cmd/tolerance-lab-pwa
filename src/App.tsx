import { useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useRouter } from './hooks/useRouter';
import { defaultContent } from './data';
import type { SiteContent, LabTracker } from './types';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Units } from './pages/Units';
import { UnitDetail } from './pages/UnitDetail';
import { Archive } from './pages/Archive';
import { LabDetail } from './pages/LabDetail';
import { Tracker } from './pages/Tracker';

const REQUIRED_UNIT_IDS = ['unit-01', 'unit-02', 'unit-03', 'unit-04', 'unit-05', 'unit-06', 'unit-07', 'unit-08'];

function App() {
  const [content, setContent] = useLocalStorage<SiteContent>('tl-content-v4', defaultContent);
  const [tracker, setTracker] = useLocalStorage<LabTracker>('tl-tracker', {});
  const { route, navigate } = useRouter();

  // Guard: if cached content has stale/missing units, reset to defaults
  useEffect(() => {
    const hasAllUnits =
      content.units.length === 8 &&
      REQUIRED_UNIT_IDS.every((id) => content.units.some((u) => u.id === id));
    if (!hasAllUnits) {
      setContent(defaultContent);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateContent = (updater: (prev: SiteContent) => SiteContent) => {
    setContent(updater);
  };

  const updateTracker = (updater: (prev: LabTracker) => LabTracker) => {
    setTracker(updater);
  };

  let page;
  switch (route.name) {
    case 'home':
      page = <Home content={content} update={updateContent} navigate={navigate} />;
      break;
    case 'units':
      page = <Units content={content} update={updateContent} navigate={navigate} />;
      break;
    case 'unit': {
      const unit = content.units.find((u) => u.id === route.id);
      if (unit) {
        page = <UnitDetail unit={unit} content={content} update={updateContent} navigate={navigate} />;
      } else {
        page = <Units content={content} update={updateContent} navigate={navigate} />;
      }
      break;
    }
    case 'archive':
      page = <Archive content={content} update={updateContent} navigate={navigate} tracker={tracker} />;
      break;
    case 'lab': {
      const lab = content.labs.find((l) => l.id === route.id);
      if (lab) {
        page = (
          <LabDetail
            lab={lab}
            content={content}
            update={updateContent}
            navigate={navigate}
            tracker={tracker}
            setTracker={updateTracker}
          />
        );
      } else {
        page = <Archive content={content} update={updateContent} navigate={navigate} tracker={tracker} />;
      }
      break;
    }
    case 'tracker':
      page = <Tracker content={content} update={updateContent} navigate={navigate} tracker={tracker} setTracker={updateTracker} />;
      break;
    default:
      page = <Home content={content} update={updateContent} navigate={navigate} />;
  }

  return (
    <div className="min-h-screen bg-bone">
      <Nav route={route} navigate={navigate} />
      <main>{page}</main>
      <Footer
        footerText={content.footerText}
        onFooterChange={(v) => updateContent((p) => ({ ...p, footerText: v }))}
      />
    </div>
  );
}

export default App;
