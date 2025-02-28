import { getServerSession } from 'next-auth';
import HomeClientComp from './components/home/home';
import Navigation from './components/UI/Navigation';
import { authOptions } from './utils/auth';
export default async function Home() {
    const session = await getServerSession(authOptions);

    const provider = session?.user.provider;
    return (
        <>
            <Navigation session={session} />
            <HomeClientComp session={session} />
        </>
    );
}
