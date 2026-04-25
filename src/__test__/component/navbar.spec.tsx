import { render, screen } from "@testing-library/react"
import Navbar from "@/components/layouts/navbar"

jest.mock("next/dist/client/script", () => {
  return function MockScript() {
    return null
  }
})

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: {},
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      isReady: true,
    }
  },
}))

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}))

import { useSession } from "next-auth/react"
const mockUseSession = useSession as jest.Mock

describe("Navbar Component", () => {
  it("renders navbar correctly (snapshot)", () => {
    mockUseSession.mockReturnValue({ data: null })

    const page = render(<Navbar />)
    expect(page).toMatchSnapshot()  
  })
})