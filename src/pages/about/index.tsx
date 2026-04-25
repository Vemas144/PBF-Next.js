import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function About() {
    return (
        <div>
            <h1 data-testid="title">About Page</h1>
            <p>Vemas Bagus Fermanda</p>
            <p>2341720137</p>
            <p>D4 Teknik Informatika</p>
        </div>
    )
}
