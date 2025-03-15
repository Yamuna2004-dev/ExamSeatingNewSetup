import { FullSizeCentered } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';

function ExamSchedule() {
  const isPortrait = useOrientation();

  return (
    <>
      <meta name="title" content="Welcome" />
      <FullSizeCentered flexDirection={isPortrait ? 'column' : 'row'}>
        <p>EXAM SCHEDULE</p>
      </FullSizeCentered>
    </>
  );
}

export default ExamSchedule;
