import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/client';

import styles from './styles.module.scss';

export function SignInWithGithub() {
    const [session] = useSession();

    console.log(session)

    return session ? (
        <button type="button" className={styles.signInButton}>
            <FaGithub color="#04d361" />
            Lucas Duarte
            <FiX color="#737380" className={styles.closeIcon} onClick={() => signOut()}/>
        </button>
    ) : (
        <button type="button" className={styles.signInButton} onClick={() => signIn()}>
            <FaGithub color="#eba417" />
            Sign in with Github
        </button>
    )

}