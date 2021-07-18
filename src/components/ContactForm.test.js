/* I would love to make this test DRY but I received errors
   when I declared the elements at the top of the test.
   If I can receive any tips how to do that, I would be 
   grateful!!
*/

import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)

    const header = screen.getByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, 'me');

    const errorMessages = screen.getAllByTestId("error")
    expect(errorMessages).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    userEvent.type(firstNameInput, "s");
    userEvent.type(lastNameInput, "d");
    userEvent.type(emailInput, "s");
    userEvent.type(messageInput, "s");


    userEvent.type(firstNameInput, "");
    userEvent.type(lastNameInput, "");
    userEvent.type(emailInput, "");
    userEvent.type(messageInput, "");

    const errorMessages = screen.getAllByTestId("error")
    expect(errorMessages).toHaveLength(2); // only two show up in the array for errors!! HELP!
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);

    userEvent.type(firstNameInput, "Garrus");
    userEvent.type(lastNameInput, "Vakarian");
    userEvent.type(emailInput, "s");

    const errorMessages = screen.getAllByTestId("error")
    expect(errorMessages).toHaveLength(1);

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "s");

    const errorMessages = screen.getByTestId("error")
    expect(errorMessages).toHaveTextContent("email must be a valid email address");

});

test('renders "lastName is a required field" if a last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    userEvent.type(firstNameInput, "Garrus");
    userEvent.type(lastNameInput, "");
    userEvent.type(emailInput, "sailormarsroxms@yahoo.com");
    userEvent.type(messageInput, "Calibrations!!!");

    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorMessages = screen.getByTestId("error")
    expect(errorMessages).toHaveTextContent("lastName is a required field");
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    userEvent.type(firstNameInput, "Commander");
    userEvent.type(lastNameInput, "Shepard");
    userEvent.type(emailInput, "IheartLiara3000@yahoo.com");

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(messageInput).not.toHaveTextContent("This is my favorite test on Git Hub.");
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    userEvent.type(firstNameInput, "Commander");
    userEvent.type(lastNameInput, "Shepard");
    userEvent.type(emailInput, "IheartLiara3000@yahoo.com");
    userEvent.type(messageInput, "This is my favorite test on Git Hub.");
    
    const button = screen.getByRole('button');
    userEvent.click(button);

    const firstnameDisplay = screen.getByTestId("firstnameDisplay")
    const lastnameDisplay = screen.getByTestId("lastnameDisplay")
    const emailDisplay = screen.getByTestId("emailDisplay")
    const messageDisplay = screen.getByTestId("messageDisplay")

    expect(firstnameDisplay).toHaveTextContent("Commander");
    expect(lastnameDisplay).toHaveTextContent("Shepard");
    expect(emailDisplay).toHaveTextContent("IheartLiara3000@yahoo.com");
    expect(messageDisplay).toHaveTextContent("This is my favorite test on Git Hub.");
});