// POST -> /api/admin + BEARER TOKEN
const addRestaurant = async (req, res) => {
  try {
    const states = [
      {
        name: "TamilNadu",
        cities: ["Chennai", "Salem", "Coimbatore", "Trichy"],
      },
      {
        name: "Karnataka",
        cities: ["Bengaluru", "Mysore"],
      },
      {
        name: "Kerala",
        cities: ["Thiruvananthapuram", "Thrissur"],
      },
    ];

    res.status(200).json({ error: false, data: states });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = { addRestaurant };
