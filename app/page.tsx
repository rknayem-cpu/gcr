// app/page.tsx
import CertificateForm from '../components/Cr';

export default async function HomePage() {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return <CertificateForm />;
}
