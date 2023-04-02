// async function submitOrder() {
//     try {
//       const response = await fetch('/submit-order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           cartItems: collectCartItems(),
//         }),
//       });
  
//       if (!response.ok) {
//         const text = await response.text();
//         throw new Error(text);
//       }
  
//       console.log('Order submitted successfully');
//       if (typeof localStorage !== 'undefined') {
//         localStorage.removeItem('cartItems');
//       }
  
//       // Delete cart items after submitting the order
//       await deleteCartItems();
  
//       window.location.href = '/address';
//     } catch (error) {
//       console.error('Error submitting order:', error);
//     }
//   }