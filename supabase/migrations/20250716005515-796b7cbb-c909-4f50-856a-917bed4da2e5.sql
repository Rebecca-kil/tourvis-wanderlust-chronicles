-- Add URL fields for flight, accommodation, and tour ticket booking links
ALTER TABLE blog_guid 
ADD COLUMN flight_booking_url text,
ADD COLUMN accommodation_booking_url text,
ADD COLUMN tour_booking_url text;