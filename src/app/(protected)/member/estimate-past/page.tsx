import ReceivedEstimate from "./_components/ReceivedEstimate";
import { receivedEstimateData } from "./_components/ReceivedEstimateData";

export default function EstimateExamplePage() {
  return (
    <main className="flex flex-col justify-center gap-10">
      {receivedEstimateData.map((estimate) => (
        <ReceivedEstimate key={estimate.id} data={estimate} />
      ))}
    </main>
  );
}
