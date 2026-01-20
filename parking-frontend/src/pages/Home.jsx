import Container from '../components/layout/Container'

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">Welcome to Parking Admin</h1>
        <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
          Manage your enterprise parking operations with a secure, scalable, and user-friendly platform. Use the sidebar to navigate modules and get started.
        </p>
      </div>
    </Container>
  )
}
