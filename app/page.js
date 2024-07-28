"use client"
import {
  SignInButton,
  UserButton,
  useUser
} from '@clerk/nextjs';
import AdminLayout from '../components/AdminLayout'
import Dashboard from '@/pages/Dashboard';
export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    // Handle loading state however you like
    return null;
  }

  

  return (
    <div className="main-container">
      {isSignedIn ? (
        <div>
          <AdminLayout title='Dashboard'>
            <Dashboard/>
          </AdminLayout>
        </div>
      ) : (
          <SignInButton />
      )}
    </div>
  );
}
