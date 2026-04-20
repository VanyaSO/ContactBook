export const routes = {
    home: '/',
    contactDetails: '/contacts/:id',
    contactCreate: '/contacts/create',
    contactEdit: '/contacts/edit/:id',
    notFound: '/not-found',
} as const;

export const getContactDetailsPath = (id: string) => `/contacts/${id}`;
export const getContactEditPath = (id: string) => `/contacts/edit/${id}`;