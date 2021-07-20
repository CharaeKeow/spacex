import { UserButton, useUser } from "@clerk/clerk-react";
import Image from 'next/image'
import { useClerkSWR } from '../utils/fetchers'
//import Launches from "./launches/[launches]";

import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const options = {
    page: 1,
    limit: 10,
  }

  const res = await fetch('https://api.spacexdata.com/v4/launches')
  const launches = await res.json()

  if (!launches) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      launches,
    },
  }
}

export default function Home({ launches }) {
  const { firstName } = useUser();

  return (
    <>
      <header>
        <UserButton />
      </header>
      <main>
        <div>Hello, {firstName}!</div>
        <div>
          <ul className={styles.list}>
            {launches.map((launch) => (
              <li className={styles.listItem}>
                {launch.links.patch.small !== null ?
                  <Image src={launch.links.patch.small} width="200" height="200" /> : <>no image</>}
                <div>{launch.name}</div>
                <div>{launch.date_local}</div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}