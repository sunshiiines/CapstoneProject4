app.listen(PORT, function () {
    console.log('App starting on port', PORT);
  });
   Alpine.data('doctorsList', () => ({
          doctors: [
              { name: 'Dr One', address: '453 Doctor\'s street, Dr Town, Durban', phone: '031 245 7658' },
              { name: 'Dr Two', address: '453 Doctor Ave, Dr City, Johannesburg', phone: '011 245 7658' },
              { name: 'Dr Three', address: '453 DR lane, Doctorsburg, Cape Town', phone: '021 245 7658' },
      
          ],
          appointmentModal: false,
          selectedDoctor: null,
      }));
  