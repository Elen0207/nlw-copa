import { FormEvent, useState } from 'react'
import { GetStaticProps } from 'next'
import toast from 'react-hot-toast'
import Image from 'next/image'

import logoImage from '../assets/logo.svg'
import mobileImage from '../assets/app-nlw-copa-preview.png'
import avatarsImage from '../assets/users-avatar-example.png'
import iconCheck from '../assets/check.svg'
import { api } from '../lib/axios'

interface HomeProps {
	poolCount: number
	guessCount: number
	userCount: number
}

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
	const [poolTitle, setPoolTitle] = useState('')

	async function handleCreatePool(event: FormEvent) {
		event.preventDefault()

		try {
			const { data } = await api.post('pools', {
				title: poolTitle
			})

			await navigator.clipboard.writeText(data)

			toast.success('Bolão criado com sucesso! Código copiado para a área de transferência.')

			setPoolTitle('')
		} catch(e) {
			toast.error('Falha ao criar o bolão.')
		}
	}

	return (
		<div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
			<main>
				<Image
					src={logoImage}
					alt="Logo do app."
				/>

				<h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

				<div className="mt-10 flex items-center gap-2">
					<Image src={avatarsImage} alt="" />

					<strong className="text-gray-100 text-xl">
						<span className="text-ignite-500">+{userCount}</span> pessoas já estão usando
					</strong>
				</div>

				<form
					onSubmit={handleCreatePool} 
					className="mt-10 flex gap-2"
				>
					<input
						type="text"
						required
						placeholder="Qual nome do seu bolão?"
						className="flex-1 py-4 px-6 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
						onChange={e => {
							setPoolTitle(e.target.value)
						}}
						value={poolTitle}
					/>

					<button
						type="submit"
						className="bg-yellow-500 py-4 px-6 rounded uppercase font-bold text-sm hover:bg-yellow-700 transition-colors"
					>
						Criar meu bolão
					</button>
				</form>

				<p className="text-gray-300 text-sm mt-4 leading-relaxed">
					Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
				</p>

				<div className="mt-10 pt-10 border-t border-gray-600 grid grid-cols-2 divide-x divide-gray-600 text-gray-100">
					<div className="flex justify-start gap-6">
						<Image src={iconCheck} alt="" />

						<div className="flex flex-col">
							<span className="font-bold text-2xl">+{poolCount}</span>
							<span>Bolões criados</span>
						</div>
					</div>

					<div className="flex justify-end gap-6">
						<Image src={iconCheck} alt="" />

						<div className="flex flex-col">
							<span className="font-bold text-2xl">+{guessCount}</span>
							<span>Palpites enviados</span>
						</div>
					</div>
				</div>
			</main>

			<Image
				src={mobileImage}
				alt="Dois celular exibindo telas do app."
				quality={100}
			/>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const [poolCount, guessCount, userCount] = await Promise.all([
		api.get('pools/count'),
		api.get('guesses/count'),
		api.get('users/count')
	])

	return {
		props: {
			poolCount: poolCount.data.count,
			guessCount: guessCount.data.count,
			userCount: userCount.data.count
		},
		revalidate: 10
	}
}