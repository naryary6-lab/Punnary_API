// មុខងារទទួលការបញ្ជាទិញពី Mini App
app.post('/order', async (req, res) => {
    const { items, total } = req.body;
    
    // រៀបចំសារសម្រាប់ផ្ញើទៅកាន់ Admin / ក្រុមការងារ
    let orderMessage = `🚨 មានការបញ្ជាទិញថ្មីពី MoMore Mini App!\n\n`;
    items.forEach((item, index) => {
        orderMessage += `${index + 1}. ${item.name} - $${item.price.toFixed(2)}\n`;
    });
    orderMessage += `\n💰 សរុបទឹកប្រាក់: $${total}`;

    // Telegram Chat ID របស់ Admin (ជំនួសលេខនេះដោយ Chat ID ផ្ទាល់ខ្លួនរបស់បង)
    const -1004387546731 = '-1004387546731';

    try {
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: -1004387546731,
            text: orderMessage,
        });
        res.status(200).json({ status: 'success', message: 'Order sent successfully' });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ status: 'error', message: 'Failed to send order' });
    }
});
