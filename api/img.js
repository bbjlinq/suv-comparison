export default async function handler(req, res) {
  const { id } = req.query;
  
  const images = {
    '1': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/2025_Toyota_4Runner_TRD_Off-Road,_front_8.18.24.jpg/800px-2025_Toyota_4Runner_TRD_Off-Road,_front_8.18.24.jpg',
    '2': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/2024_Toyota_Land_Cruiser_First_Edition,_front_9.6.23.jpg/800px-2024_Toyota_Land_Cruiser_First_Edition,_front_9.6.23.jpg',
    '3': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/2022_Chevrolet_Tahoe_Z71,_front_10.13.21.jpg/800px-2022_Chevrolet_Tahoe_Z71,_front_10.13.21.jpg',
    '4': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/2023_Hyundai_Palisade_Calligraphy_AWD,_front_3.20.22.jpg/800px-2023_Hyundai_Palisade_Calligraphy_AWD,_front_3.20.22.jpg',
    '5': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/2024_Hyundai_Santa_Fe_XRT_AWD,_front_11.18.23.jpg/800px-2024_Hyundai_Santa_Fe_XRT_AWD,_front_11.18.23.jpg',
    '6': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/2023_Land_Rover_Range_Rover_Sport_SE,_front_9.10.22.jpg/800px-2023_Land_Rover_Range_Rover_Sport_SE,_front_9.10.22.jpg',
    '7': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/2023_Land_Rover_Defender_110_SE,_front_11.6.22.jpg/800px-2023_Land_Rover_Defender_110_SE,_front_11.6.22.jpg',
    '8': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/2021_Land_Rover_Discovery_SE_R-Dynamic,_front_8.1.21.jpg/800px-2021_Land_Rover_Discovery_SE_R-Dynamic,_front_8.1.21.jpg',
    '9': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/2022_Rivian_R1S_Launch_Edition,_front_7.2.22.jpg/800px-2022_Rivian_R1S_Launch_Edition,_front_7.2.22.jpg',
  };

  const url = images[id];
  if (!url) return res.status(404).end('Not found');

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
        'Referer': 'https://en.wikipedia.org/',
      }
    });
    
    if (!response.ok) throw new Error(`Upstream ${response.status}`);
    
    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(Buffer.from(buffer));
  } catch (e) {
    res.status(502).end('Image fetch failed: ' + e.message);
  }
}
