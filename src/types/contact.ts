export enum ContactStatus {
    Active = 'active',
    Deleted = 'deleted',
}

export type Contact = {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
    status: ContactStatus;
}

export type ContactCreatePayload = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
}

export type ContactUpdatePayload = {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
}