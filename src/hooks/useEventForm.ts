// useEventForm.ts
import { useRef, useState } from "react";

export type TicketType = {
  id: number;
  name: string;
  price: string;
  quantity: string;
};

export type EventFormData = {
  eventName: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  organizer: string;
  eventType: string;
  eventCategory: string;
  ticketTypes: TicketType[];
  eventImage: string;
};

export type ValidationErrors = {
  eventName?: string;
  organizer?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  eventType?: string;
  description?: string;
  ticketTypes?: string;
  eventImage?: string;
  ticketErrors?: { [key: number]: { name?: string; price?: string; quantity?: string } };
};

export const useEventForm = () => {
  const [formData, setFormData] = useState<EventFormData>({
    eventName: "",
    startDate: "",
    endDate: "",
    description: "",
    organizer: "",
    eventCategory: "",
    ticketTypes: [{ id: 1, name: "", price: "", quantity: "" }],
    location: "",
    eventImage: "",
    eventType: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleInputBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    // Validate only the blurred field
    const newErrors = validateForm();
    setErrors((prev) => ({ ...prev, [field]: newErrors[field as keyof ValidationErrors] }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
    if (errors.description) {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const handleTicketBlur = (id: number, field: keyof TicketType) => {
    setTouched((prev) => ({ ...prev, [`ticket_${id}_${field}`]: true }));
    // Validate ticket fields
    const newErrors = validateForm();
    setErrors((prev) => ({ ...prev, ticketErrors: newErrors.ticketErrors }));
  };

  const addTicketType = () => {
    const newId = Math.max(...formData.ticketTypes.map((t) => t.id), 0) + 1;
    setFormData((prev) => ({
      ...prev,
      ticketTypes: [
        ...prev.ticketTypes,
        { id: newId, name: "", price: "", quantity: "" },
      ],
    }));
    // Clear general ticketTypes error when adding a new ticket
    if (errors.ticketTypes) {
      setErrors((prev) => ({ ...prev, ticketTypes: undefined }));
    }
  };

  const removeTicketType = (id: number) => {
    if (formData.ticketTypes.length > 1) {
      setFormData((prev) => ({
        ...prev,
        ticketTypes: prev.ticketTypes.filter((ticket) => ticket.id !== id),
      }));
      // Clear ticket-specific errors for removed ticket
      setErrors((prev) => {
        const newTicketErrors = { ...prev.ticketErrors };
        delete newTicketErrors[id];
        return { ...prev, ticketErrors: newTicketErrors };
      });
    }
  };

  const updateTicketType = (
    id: number,
    field: keyof TicketType,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      ticketTypes: prev.ticketTypes.map((ticket) =>
        ticket.id === id ? { ...ticket, [field]: value } : ticket
      ),
    }));

    // Clear ticket-specific error for the updated field
    // Fix for Error 1: Exclude 'id' from the field check since it's not in the error object
    if (field !== 'id' && errors.ticketErrors?.[id]?.[field as keyof Omit<TicketType, 'id'>]) {
      setErrors((prev) => {
        const newTicketErrors = { ...prev.ticketErrors };
        if (newTicketErrors[id]) {
          newTicketErrors[id] = { 
            ...newTicketErrors[id], 
            [field as keyof Omit<TicketType, 'id'>]: undefined 
          };
        }
        return { ...prev, ticketErrors: newTicketErrors };
      });
    }
    // Clear general ticketTypes error
    if (errors.ticketTypes) {
      setErrors((prev) => ({ ...prev, ticketTypes: undefined }));
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Fix for Error 2: Add null check for e.target
        if (e.target?.result && typeof e.target.result === "string") {
          setSelectedImage(e.target.result);
          setFormData((prev) => ({ ...prev, eventImage: e.target!.result as string}));
          if (errors.eventImage) {
            setErrors((prev) => ({ ...prev, eventImage: undefined }));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Event name validation
    if (!formData.eventName.trim()) {
      newErrors.eventName = "Event name is required";
    } else if (formData.eventName.trim().length < 3) {
      newErrors.eventName = "Event name must be at least 3 characters";
    }

    // Organizer validation
    if (!formData.organizer.trim()) {
      newErrors.organizer = "Organizer name is required";
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    // Event type validation
    if (!formData.eventType) {
      newErrors.eventType = "Event type is required";
    }

    // Date validation
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const now = new Date();

      if (startDate < now) {
        newErrors.startDate = "Start date cannot be in the past";
      }

      if (endDate <= startDate) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    // Description validation
    const plainTextDescription = formData.description.replace(/<[^>]*>/g, "").trim();
    if (!plainTextDescription) {
      newErrors.description = "Event description is required";
    } else if (plainTextDescription.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    // Ticket types validation
    const ticketErrors: { [key: number]: { name?: string; price?: string; quantity?: string } } = {};
    let hasValidTicket = false;

    formData.ticketTypes.forEach((ticket) => {
      const ticketTouched = touched[`ticket_${ticket.id}_name`] || touched[`ticket_${ticket.id}_price`] || touched[`ticket_${ticket.id}_quantity`];
      if (!ticketTouched) return; // Skip validation for untouched tickets

      const ticketError: { name?: string; price?: string; quantity?: string } = {};

      if (!ticket.name.trim()) {
        ticketError.name = "Ticket name is required";
      }

      if (!ticket.price.trim()) {
        ticketError.price = "Price is required";
      } else if (parseFloat(ticket.price) <= 0) {
        ticketError.price = "Price must be greater than 0";
      }

      if (!ticket.quantity.trim()) {
        ticketError.quantity = "Quantity is required";
      } else if (parseInt(ticket.quantity) <= 0) {
        ticketError.quantity = "Quantity must be greater than 0";
      }

      if (ticket.name.trim() && parseFloat(ticket.price) > 0 && parseInt(ticket.quantity) > 0) {
        hasValidTicket = true;
      }

      if (Object.keys(ticketError).length > 0) {
        ticketErrors[ticket.id] = ticketError;
      }
    });

    if (Object.keys(ticketErrors).length > 0) {
      newErrors.ticketErrors = ticketErrors;
    }

    if (!hasValidTicket) {
      newErrors.ticketTypes = "At least one valid ticket type is required (name, price > 0, quantity > 0)";
    }

    // Image validation
    if (!formData.eventImage) {
      newErrors.eventImage = "Event image is required";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    // Mark all fields as touched to show validation errors
    const allFields = ['eventName', 'organizer', 'location', 'startDate', 'endDate', 'eventType', 'description'];
    const newTouched: Record<string, boolean> = {};
    allFields.forEach(field => {
      newTouched[field] = true;
    });
    // Mark ticket fields as touched
    formData.ticketTypes.forEach((ticket) => {
      newTouched[`ticket_${ticket.id}_name`] = true;
      newTouched[`ticket_${ticket.id}_price`] = true;
      newTouched[`ticket_${ticket.id}_quantity`] = true;
    });
    setTouched(newTouched);

    // Validate entire form
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      // Handle form submission here
    }
  };

  return {
    formData,
    errors,
    touched,
    selectedImage,
    fileInputRef,
    handleInputChange,
    handleInputBlur,
    handleDescriptionChange,
    handleTicketBlur,
    addTicketType,
    removeTicketType,
    updateTicketType,
    handleFileSelect,
    handleSubmit,
  };
};