import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';


describe('Online Doctors Clinic App', () => {

  // Requirement: Landing Page & Basic Navigation
  test('renders the main application header', () => {
    render(<App />);
    const linkElement = screen.getByText(/Online Doctors Clinic/i);
    expect(linkElement).toBeInTheDocument();
  });

  // Requirement Section 1: Patient Registration
  // "Allow patients to register accounts with basic information (name, email, phone number)."
  test('navigates to registration and shows required profile fields', () => {
    render(<App />);
    
    // Navigate to Register page
    const registerLink = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(registerLink);

    // Check for fields specified in PDF Page 1
    expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Phone Number/i)).toBeInTheDocument();
    
    // Check for submit button
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  // Requirement Section 2: Doctor Profiles
  // "Create detailed profiles... including specialties, qualifications... Display reviews, ratings"
  test('displays doctor profiles with specialties and ratings', async () => {
    render(<App />);

    // Navigate to Doctors list
    const doctorsLink = screen.getByText(/Find a Doctor/i);
    fireEvent.click(doctorsLink);

    // Wait for doctor cards to load (mocking async data)
    await waitFor(() => {
      const doctorCards = screen.getAllByTestId('doctor-card');
      expect(doctorCards.length).toBeGreaterThan(0);
    });

    // Check specific details from requirements
    expect(screen.getByText(/Specialty:/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating:/i)).toBeInTheDocument(); // e.g., "Rating: 4.5"
  });

  // Requirement Section 2 & 5: Appointment Scheduling
  // "Implement a calendar-based system... View doctors' availability"
  test('allows a user to open the appointment booking modal', async () => {
    render(<App />);

    // Go to doctors page
    fireEvent.click(screen.getByText(/Find a Doctor/i));

    // Click "Book Appointment" on the first doctor
    const bookButtons = await screen.findAllByText(/Book Appointment/i);
    fireEvent.click(bookButtons[0]);

    // Check if Booking/Calendar UI appears
    expect(screen.getByText(/Select Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirm Booking/i)).toBeInTheDocument();
  });

  // Requirement Section 3: Teleconsultation
  // "Integrate video conferencing capabilities... Chat Messaging"
  test('shows teleconsultation controls in active session view', () => {
    // This test might require mocking a logged-in state with an active appointment
    // For this example, we assume a route '/consultation/123'
    window.history.pushState({}, 'Consultation', '/consultation/123');
    render(<App />);

    // Check for Video Call UI elements
    const videoButton = screen.getByRole('button', { name: /Start Video/i });
    const chatInput = screen.getByPlaceholderText(/Type a message/i);

    expect(videoButton).toBeInTheDocument();
    expect(chatInput).toBeInTheDocument();
  });

  // Requirement Section 6: Payment Processing
  // "Integrate secure payment gateways... Support multiple payment methods"
  test('renders payment options during checkout', () => {
    // Navigate to a mock payment route
    window.history.pushState({}, 'Payment', '/payment');
    render(<App />);

    expect(screen.getByText(/Credit\/Debit Card/i)).toBeInTheDocument();
    expect(screen.getByText(/Pay/i)).toBeInTheDocument();
  });

});