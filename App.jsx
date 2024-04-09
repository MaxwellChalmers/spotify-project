import React, { useState } from "react";
import { Image, Carousel, Button, Form, Input } from "antd";

export default function App() {
  const [albums, setAlbums] = useState([]);

  const onFinish = (values) => {
    console.log('Success:', values);
    getSongData(values.search, values.limit);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  async function getSongData(search, limit) {
    if (limit > 20){
        limit = 20;
    }
    const url = 'https://www.apitutor.org/spotify/simple/v1/search';
    const fullUrl = `${url}?q=${search}&type=track&limit=${limit}`;
    console.log(fullUrl);
    const request = await fetch(fullUrl);
    const data = await request.json();
    console.log(data);
    setAlbums(data);
  }

  const carouselStyles = {
    "width": "640px",
    "border": "solid 1px #000",
    "margin": "auto"
  };

  function toEmbeded(id) {
    return `https://open.spotify.com/embed/track/${id}?utm_source=generator`;
  }
  
  function albumToJSX(albumJSON) {
    const embedUrl = toEmbeded(albumJSON.id);
    return (
      <iframe
        key={albumJSON.id}
        src={embedUrl}
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    );
  }
  return (
    <>
      <header>
        <h1>Spotify Demo</h1>
      </header>
      <main>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Search"
            name="search"
            rules={[
              {
                required: true,
                message: 'Please input your Search term!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Limit"
            name="limit"
            initialValue={20}
            rules={[
              {
                required: true,
                message: 'Please input number of songs!',
              },
              
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 6,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <div style={carouselStyles}>
          <Carousel dotPosition="top">
            {albums.map(albumToJSX)}
          </Carousel>
        </div>
      </main>
    </>
  );
}
