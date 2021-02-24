import { useState, useEffect } from 'react';
import axios from "axios";
import { Button, Layout, List } from 'antd';
import ColorPalette from '../components/color-palette';


const hydratePalette = (palette) => {
  Object.keys(palette)
    .filter(k => k.startsWith('color'))
    .forEach(k => {
      const [red, green, blue] = palette[k].split(',');
      palette[k] = { red, green, blue };
    });

  return palette;
}

const dehydratePalette = (palette) => {
  Object.keys(palette)
    .filter(k => k.startsWith('color'))
    .forEach(k => {
      const { red, green, blue } = palette[k];
      palette[k] = `${red},${green},${blue}`;
    });

  return palette;
}

const Home = () => {
  const [activePalette, setActivePalette] = useState(null);
  const [palettes, setPalettes] = useState([]);

  useEffect(() => {
    const fetchPalettes = async () => {
      const { status, data } = await axios.get("/api/palettes");

      if (status === 200) {
        setPalettes(data.map(d => hydratePalette(d)));
      } else {
        throw new Error("Error connecting to server");
      }
    };

    fetchPalettes();
  }, [setPalettes, axios]);

  return (
      <Layout>
        <Layout.Content style={{ margin: 20 }}>
          {activePalette ? (
            <ColorPalette
              values={activePalette}
              onSave={async (palette) => {
                const res = await axios.put('/api/palettes', { ...dehydratePalette(palette), id: activePalette.id });
                const updatedPalette = hydratePalette(res.data);
                const indexToUpdate = palettes.findIndex(p => p.id === updatedPalette.id);
                palettes.splice(indexToUpdate, 1, updatedPalette);
                setPalettes([...palettes]);
              }}
            />
          ) : null}
        </Layout.Content>

        <Layout.Sider width={400} style={{ backgroundColor: '#fff' }}>
          <List
            dataSource={palettes}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button onClick={() => setActivePalette(item)}>edit</Button>,
                  <Button danger onClick={async () => {
                    await axios.delete("/api/palettes", { data: { id: item.id } });
                    setPalettes(palettes.filter(p => p.id !== item.id ));
                    if (item.id === activePalette.id) setActivePalette(null);
                  }}>delete</Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                />
                <div>
                  {[0,1,2,3,4].map(c => (
                    <div
                      key={c}
                      style={{
                        display: 'inline-block',
                        width: 20,
                        height: 20,
                        backgroundColor: `rgb(${item[`color${c}`].red},${item[`color${c}`].green},${item[`color${c}`].blue})`
                      }}
                    />
                  ))}
                </div>
              </List.Item>
            )}
          />
          <Button
            onClick={async () => {
              const p = await axios.post("/api/palettes");
              setPalettes([...palettes, hydratePalette(p.data)]);
            }}
            type="dashed"
            block
          >
            Add New Palette
          </Button>
        </Layout.Sider>
      </Layout>
  );
};

export default Home;
