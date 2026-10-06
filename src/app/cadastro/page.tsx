import { redirect } from 'next/navigation';

export default function RegistrationRoute() {
  redirect('/login?cadastro=1');
}