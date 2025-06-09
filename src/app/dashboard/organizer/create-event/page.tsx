"use client";

import { Button } from "@/components/ui/button";
import { useEventForm } from "@/hooks/useEventForm";
import { Upload, Plus, X } from "lucide-react";
import dynamic from "next/dynamic";
import { MdAddLocationAlt } from "react-icons/md";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const Page = () => {
  const {
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
  } = useEventForm();

  return (
    <div className="flex flex-col lg:flex-row gap-6 mx-auto w-full max-w-[1200px] p-4 md:p-6 mb-14">
      {/* Left Column - Image and Location */}
      <div className="flex flex-col md:flex-row lg:flex-col gap-6 w-full lg:w-auto">
        <div className="gap-3 flex flex-col">
          <h3 className="text-lg font-bold text-white">Upload Image *</h3>
          <div
            className="h-64 w-full sm:w-64 md:h-80 md:w-80 relative cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={selectedImage ?? "/upload-image.png"}
              alt="Upload preview"
              className="h-full w-full rounded-2xl object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex flex-col items-center justify-center hover:bg-opacity-40 transition-all duration-200">
              <div className="bg-black rounded-full p-3 md:p-4">
                <Upload className="text-white" size={20} />
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          {errors.eventImage && (
            <p className="text-red-400 text-sm">{errors.eventImage}</p>
          )}
        </div>
        
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-white">Pick a Location</h3>
          <div className="h-64 w-full sm:w-64 md:h-80 md:w-80 relative cursor-pointer">
            <img
              src="/pick-location.png"
              alt="Location picker"
              className="h-full w-full rounded-2xl object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
              <div className="bg-black rounded-full p-3 md:p-4">
                <MdAddLocationAlt className="text-white" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form Fields */}
      <div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Event Name */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-white">Event Name *</h3>
          <input
            name="eventName"
            value={formData.eventName}
            onChange={handleInputChange}
            onBlur={() => handleInputBlur('eventName')}
            placeholder="Enter the name of your event"
            className={`bg-transparent border-[0.5px] ${
              errors.eventName && touched.eventName ? 'border-red-400' : 'border-white/60'
            } h-14 md:h-16 text-base md:text-lg p-4 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80`}
          />
          {errors.eventName && touched.eventName && (
            <p className="text-red-400 text-sm">{errors.eventName}</p>
          )}
        </div>

        {/* Organizer's Name */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-white">Organizer's Name *</h3>
          <input
            name="organizer"
            value={formData.organizer}
            onChange={handleInputChange}
            onBlur={() => handleInputBlur('organizer')}
            placeholder="Enter the organizer's name"
            className={`bg-transparent border-[0.5px] ${
              errors.organizer && touched.organizer ? 'border-red-400' : 'border-white/60'
            } h-14 md:h-16 text-base md:text-lg p-4 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80`}
          />
          {errors.organizer && touched.organizer && (
            <p className="text-red-400 text-sm">{errors.organizer}</p>
          )}
        </div>

        {/* Location */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-white">Location *</h3>
          <input
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            onBlur={() => handleInputBlur('location')}
            placeholder="Enter event location"
            className={`bg-transparent border-[0.5px] ${
              errors.location && touched.location ? 'border-red-400' : 'border-white/60'
            } h-14 md:h-16 text-base md:text-lg p-4 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80`}
          />
          {errors.location && touched.location && (
            <p className="text-red-400 text-sm">{errors.location}</p>
          )}
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-white">Start Date *</h3>
          <input
            name="startDate"
            type="datetime-local"
            value={formData.startDate}
            onChange={handleInputChange}
            onBlur={() => handleInputBlur('startDate')}
            className={`bg-transparent border-[0.5px] ${
              errors.startDate && touched.startDate ? 'border-red-400' : 'border-white/60'
            } h-14 md:h-16 text-base md:text-lg p-4 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80`}
          />
          {errors.startDate && touched.startDate && (
            <p className="text-red-400 text-sm">{errors.startDate}</p>
          )}
        </div>

        {/* Event Type */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-white">Event Type *</h3>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleInputChange}
            onBlur={() => handleInputBlur('eventType')}
            className={`bg-transparent border-[0.5px] ${
              errors.eventType && touched.eventType ? 'border-red-400' : 'border-white/60'
            } h-14 md:h-16 text-base md:text-lg p-4 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80 custom-select`}
          >
            <option value="" disabled className="text-white/60">
              Select event type
            </option>
            <option value="online" className="text-black">
              Online
            </option>
            <option value="physical" className="text-black">
              Physical
            </option>
          </select>
          {errors.eventType && touched.eventType && (
            <p className="text-red-400 text-sm">{errors.eventType}</p>
          )}
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-white">End Date *</h3>
          <input
            name="endDate"
            type="datetime-local"
            value={formData.endDate}
            onChange={handleInputChange}
            onBlur={() => handleInputBlur('endDate')}
            className={`bg-transparent border-[0.5px] ${
              errors.endDate && touched.endDate ? 'border-red-400' : 'border-white/60'
            } h-14 md:h-16 text-base md:text-lg p-4 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80`}
          />
          {errors.endDate && touched.endDate && (
            <p className="text-red-400 text-sm">{errors.endDate}</p>
          )}
        </div>

        {/* Ticket Types Section */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-white">Ticket Types *</h3>
            <button
              type="button"
              onClick={addTicketType}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors w-full sm:w-auto justify-center"
            >
              <Plus size={16} />
              Add Ticket Type
            </button>
          </div>

          {formData.ticketTypes.map((ticket) => (
            <div key={ticket.id} className="flex flex-col sm:flex-row gap-3">
              {/* Ticket Name Input */}
              <div className="flex-1">
                <input
                  type="text"
                  value={ticket.name}
                  onChange={(e) =>
                    updateTicketType(ticket.id, "name", e.target.value)
                  }
                  onBlur={() => handleTicketBlur(ticket.id, "name")}
                  placeholder="Ticket name"
                  className={`w-full bg-transparent border-[0.5px] ${
                    errors.ticketErrors?.[ticket.id]?.name && touched[`ticket_${ticket.id}_name`]
                      ? "border-red-400"
                      : "border-white/60"
                  } h-14 md:h-16 text-base md:text-lg p-4 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80`}
                />
                {errors.ticketErrors?.[ticket.id]?.name && touched[`ticket_${ticket.id}_name`] && (
                  <p className="text-red-400 text-sm">{errors.ticketErrors[ticket.id].name}</p>
                )}
              </div>

              {/* Ticket Price Input */}
              <div className="flex-1">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={ticket.price}
                  onChange={(e) =>
                    updateTicketType(ticket.id, "price", e.target.value)
                  }
                  onBlur={() => handleTicketBlur(ticket.id, "price")}
                  placeholder="Ticket price"
                  className={`w-full bg-transparent border-[0.5px] ${
                    errors.ticketErrors?.[ticket.id]?.price && touched[`ticket_${ticket.id}_price`]
                      ? "border-red-400"
                      : "border-white/60"
                  } h-14 md:h-16 text-base md:text-lg p-4 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80`}
                />
                {errors.ticketErrors?.[ticket.id]?.price && touched[`ticket_${ticket.id}_price`] && (
                  <p className="text-red-400 text-sm">{errors.ticketErrors[ticket.id].price}</p>
                )}
              </div>

              {/* Ticket Quantity Input */}
              <div className="flex-1">
                <input
                  type="number"
                  min="1"
                  value={ticket.quantity}
                  onChange={(e) =>
                    updateTicketType(ticket.id, "quantity", e.target.value)
                  }
                  onBlur={() => handleTicketBlur(ticket.id, "quantity")}
                  placeholder="Quantity"
                  className={`w-full bg-transparent border-[0.5px] ${
                    errors.ticketErrors?.[ticket.id]?.quantity && touched[`ticket_${ticket.id}_quantity`]
                      ? "border-red-400"
                      : "border-white/60"
                  } h-14 md:h-16 text-base md:text-lg p-4 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80`}
                />
                {errors.ticketErrors?.[ticket.id]?.quantity && touched[`ticket_${ticket.id}_quantity`] && (
                  <p className="text-red-400 text-sm">{errors.ticketErrors[ticket.id].quantity}</p>
                )}
              </div>

              {/* Remove Button */}
              {formData.ticketTypes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTicketType(ticket.id)}
                  className="flex items-center justify-center w-full sm:w-16 h-14 md:h-16 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}

          {errors.ticketTypes && (
            <p className="text-red-400 text-sm">{errors.ticketTypes}</p>
          )}
        </div>

        {/* Event Description */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <h3 className="text-lg font-bold text-white">Event Description *</h3>
          <div
            className={`rounded-xl overflow-hidden border-[0.5px] ${
              errors.description && touched.description ? "border-red-400" : "border-white/60"
            } focus-within:ring-2 focus-within:ring-white/80`}
          >
            <ReactQuill
              value={formData.description}
              onChange={handleDescriptionChange}
              onBlur={() => handleInputBlur("description")}
              placeholder="Enter a brief description of the event"
              className="bg-transparent text-white h-48 md:h-64"
              theme="snow"
            />
          </div>
          {errors.description && touched.description && (
            <p className="text-red-400 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <Button
            onClick={handleSubmit}
            className={`p-4 md:p-6 text-white font-bold text-base md:text-lg transition-all duration-200 ${
              Object.keys(errors).length === 0 && formData.eventImage
                ? "bg-subsidiary hover:bg-subsidiary/80 hover:scale-105 cursor-pointer"
                : "bg-gray-600 cursor-not-allowed opacity-50"
            }`}
            disabled={Object.keys(errors).length > 0 || !formData.eventImage}
          >
            Create Event
          </Button>
        </div>
      </div>

      {/* Custom styles for ReactQuill and Select */}
      <style jsx global>{`
        .quill {
          background: none;
        }
        .ql-container {
          background: transparent;
          border: none !important;
          color: white;
          font-size: 1rem;
          padding: 0.5rem;
          border-radius: 0 0 0.5rem 0.5rem;
          height: calc(100% - 2.5rem);
        }
        .ql-editor {
          color: white !important;
          font-size: 1rem;
        }
        .ql-editor.ql-blank::before {
          color: rgba(255, 255, 255, 0.6) !important;
          opacity: 1 !important;
          font-style: normal !important;
        }
        .ql-toolbar {
          border: none !important;
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.6) !important;
          border-radius: 0.5rem 0.5rem 0 0;
          padding: 0.5rem !important;
        }
        .ql-toolbar .ql-formats {
          margin-right: 8px;
        }
        .ql-toolbar .ql-formats button {
          color: white !important;
          width: 24px;
          height: 24px;
        }
        .ql-toolbar .ql-formats button:hover,
        .ql-toolbar .ql-formats button.ql-active {
          color: #fff !important;
        }
        .ql-toolbar .ql-formats .ql-stroke {
          stroke: white !important;
        }
        .ql-toolbar .ql-formats .ql-fill {
          fill: white !important;
        }
        .ql-toolbar .ql-formats .ql-picker-label {
          color: white !important;
        }
        .ql-toolbar .ql-formats .ql-picker-options {
          background: #333 !important;
          color: white !important;
        }

        /* Custom select styling for chevron-down */
        .custom-select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.6)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1rem;
          padding-right: 2.5rem;
        }
        .custom-select option {
          color: black;
          background: #333;
        }

        @media (max-width: 640px) {
          .ql-toolbar .ql-formats {
            margin-right: 4px;
          }
          .ql-toolbar .ql-formats button {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Page;