import React from "react"
import { Router } from "@reach/router"
import { login, isAuthenticated, getProfile } from "../utils/auth"
import { StoreProvider } from '../store'

import Layout from "../components/layout"
import SEO from "../components/seo"

import HomeView from '../views/homeView'
import EditImageView from '../views/editImageView'
import ProfileView from '../views/profileView'

const Me = () => {

  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <StoreProvider>
      <Layout>
        <SEO title="Welcome" />
        <Router>
          <HomeView path="/me" user={user} />
          <EditImageView path="/me/edit" user={user} />
          <ProfileView path="/me/profile" user={user} />
        </Router>
      </Layout>
    </StoreProvider>
  )
}

export default Me
