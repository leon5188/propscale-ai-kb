import { registerRoot } from 'remotion';
import { Composition } from 'remotion';
import { PropertyReport } from './PropertyReport';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PropertyReport"
        component={PropertyReport}
        durationInFrames={300} // 10 seconds at 30fps
        fps={30}
        width={1080}
        height={1920} // Vertical format for mobile/social
        defaultProps={{
          address: "816 S Stoneman Ave",
          zestimate: "$852,400",
          agentName: "Sarah",
          companyName: "PropScale Realty",
          permitIntel: "New Roof (2024)",
          score: "94"
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
