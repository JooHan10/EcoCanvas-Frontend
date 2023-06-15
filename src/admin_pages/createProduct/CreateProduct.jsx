import React, { useEffect, useState } from "react";
import './createProduct.css'
import Toggle from '../../admin_conponents/toggle/Category_toggle';

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    uploaded_images: "",
    product_name: "",
    product_stock: "",
    product_desc: "",
    category: "",
    product_price: ""
  });
  const [categoryId, setCategoryId] = useState();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access');

    fetch("http://127.0.0.1:8000/shop/categorys/list/", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => response.json())
      .then(result => {
        console.log(result)
        setCategoryList(result);
      })
  }, []);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const parsedCategoryId = parseInt(categoryId, 10);
    const token = localStorage.getItem('access');


    const selectedCategory = categoryList.find(category => category.id === parsedCategoryId);
    if (!selectedCategory) {
      console.error('카테고리가 존재하지 않습니다');
      return;
    }

    const formData = new FormData();
    const fileInput = e.target.elements.uploaded_images;
    for (let i = 0; i < fileInput.files.length; i++) {
      formData.append('uploaded_images', fileInput.files[i]);
    }
    formData.append('product_name', e.target.elements.product_name.value);
    formData.append('product_price', e.target.elements.product_price.value);
    formData.append('product_stock', e.target.elements.product_stock.value);
    formData.append('product_desc', e.target.elements.product_desc.value);
    formData.append('category', selectedCategory.id);

    fetch(`http://127.0.0.1:8000/shop/products/list/${selectedCategory.id}/`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        alert("상품 등록 완료!")
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "category") {
      setCategoryId(value);
    } else if (name === "uploaded_images") {
      const selectedImages = Array.from(files);
      setFormData({ ...formData, images: selectedImages });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  return (
    <div className="createProduct">
      <h1>상품 등록</h1>
      <form className="addProductForm" onSubmit={handleFormSubmit}>
        <div className="addProductItem">
          <label>상품 이름</label>
          <input type="text" name="product_name" placeholder="상품 이름" onChange={handleInputChange}></input>
        </div>
        <div className="addProductItem">
          <label>상품 가격</label>
          <input type="text" name="product_price" placeholder="상품 가격" onChange={handleInputChange}></input>
        </div>
        <div className="addProductItem">
          <label>상품 재고</label>
          <input type="text" name="product_stock" placeholder="상품 재고" onChange={handleInputChange}></input>
        </div>
        <div className="addProductItem">
          <label>상품 설명</label>
          <input type="text" name="product_desc" placeholder="상품 설명" onChange={handleInputChange}></input>
        </div>
        <Toggle />
        <div className="addProductItem">
          <label>상품 카테고리</label>
          <select className="select-category-dropdown" name="category" onChange={handleInputChange}>
            <option value="">카테고리 선택</option>
            {categoryList.map(category => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>

        </div>
        <div className="addProductItem">
          <label>상품 이미지</label>
          <input type="file" id="file" name="uploaded_images" onChange={handleInputChange} multiple />
        </div>
        <button className="addProductButton">생성하기</button>
      </form>
    </div>
  )
}