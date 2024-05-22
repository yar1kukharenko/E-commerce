import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GeneratePdfPage from './GeneratePdfPage';
import { vi } from 'vitest';

vi.mock('@components/Header', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked Header</div>,
  };
});

describe('GeneratePdfPage', () => {
  it('renders the form correctly', () => {
    render(<GeneratePdfPage />);

    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
    expect(screen.getByLabelText(/Имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Возраст/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пол/i)).toBeInTheDocument();
    expect(screen.getByText(/Загрузить изображение/i)).toBeInTheDocument();
    expect(screen.getByText(/Сгенерировать PDF/i)).toBeInTheDocument();
  });

  it('shows error messages when form fields are empty', async () => {
    render(<GeneratePdfPage />);

    await userEvent.click(screen.getByText(/Сгенерировать PDF/i));

    expect(await screen.findByText(/Имя обязательно/i)).toBeInTheDocument();
    expect(await screen.findByText(/Возраст обязателен/i)).toBeInTheDocument();
    expect(await screen.findByText(/Пол обязателен/i)).toBeInTheDocument();
    expect(await screen.findByText(/Изображение обязательно/i)).toBeInTheDocument();
  });

  /* it('updates form fields correctly and generates PDF link', async () => {
    render(<GeneratePdfPage />);

    await userEvent.type(screen.getByLabelText(/Имя/i), 'Test Name');
    await userEvent.type(screen.getByLabelText(/Возраст/i), '25');
    await userEvent.click(screen.getByLabelText(/Пол/i));
    await userEvent.click(screen.getByText(/Мужской/i));

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const input = screen.getByLabelText(/Загрузить изображение/i);
    await userEvent.upload(input, file);

    await userEvent.click(screen.getByText(/Сгенерировать PDF/i));

    await waitFor(() => {
      expect(screen.getByText(/Скачать PDF/i)).toBeInTheDocument();
    });
  });

  it('disables PDF download button while PDF is generating', async () => {
    render(<GeneratePdfPage />);

    await userEvent.type(screen.getByLabelText(/Имя/i), 'Test Name');
    await userEvent.type(screen.getByLabelText(/Возраст/i), '25');
    await userEvent.click(screen.getByLabelText(/Пол/i));
    await userEvent.click(screen.getByText(/Мужской/i));

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const input = screen.getByLabelText(/Загрузить изображение/i);
    await userEvent.upload(input, file);

    await userEvent.click(screen.getByText(/Сгенерировать PDF/i));

    await waitFor(() => {
      const downloadButton = screen.getByText(/Скачать PDF/i).closest('button');
      expect(downloadButton).toBeDisabled();
    });
  });*/
});
