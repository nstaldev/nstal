# @nstal/react-components

> **Warning! Breaking changes are expected!**
> This project is brand new. Everything you see here could change overnight, without notice.
> Don't build anything for production yet.
>
> But if you want to experiment, you're right on time!

## What is nstal?

nstal is [a new way to write tutorials and installation procedures](https://nstal.dev/).
Read [nstal's docs](https://nstal.dev/) or [follow an nstaller](https://nstal.dev/nstallers/create-nextjs-app-with-tailwind-support)
to learn about what it is, what it can do and how it feels.

# Components for React

`NstalReactComponents` can be provided to an `Nstaller` from `@nstal/react-core`:

```mdx
import { Nstaller } from '@nstaldev/react-core'
import { NstalReactComponents } from '@nstaldev/react-components'

# An nstaller here

export default ({ children }) => (
  <Nstaller components={NstalReactComponents}>
    {children}
  </Nstaller>
)
```
