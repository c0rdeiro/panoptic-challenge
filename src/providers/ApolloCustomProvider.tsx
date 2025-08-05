'use client'
import throwIfUndefined from '@/utils/throwIfUndefined'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
    uri: throwIfUndefined(
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        'NEXT_PUBLIC_GRAPHQL_ENDPOINT must be defined'
    ),
    cache: new InMemoryCache(),
})

export const ApolloCustomProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
