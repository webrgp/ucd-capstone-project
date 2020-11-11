import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Account = () => {
  return (
    <Layout>
      <SEO title="Page two" />
      <h1>Account Page</h1>
      <p>This is going to be a protected route.</p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default Account
