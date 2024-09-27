import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function ProtectedPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
    // console.log('ProtectedPage data===', JSON.stringify(data.user.email))
    if (error || !data?.user) {
        redirect('/login');
    }

    return (
        <div>
            <h1>Protected Page - private</h1>
        </div>
    );
}
      