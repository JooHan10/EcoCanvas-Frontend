import React, { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Sidebar from "../../components/mypageSidebar/MypageSidebar"
import '../../components/mypageSidebar/mypageSidebar.css'
import { Link } from 'react-router-dom';
import campaign_default_image from '../../img/campaign_default_image.jpg';


const MyPostCampaign = () => {
  const statusMap = {
    0: "미승인",
    1: "승인",
    2: "모집중",
    3: "캠페인 활동중",
    4: "종료",
    5: "종료 - 펀딩 모금실패",
    6: "종료 - 인원 모집실패",
    7: "종료 - 둘 다 실패",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [campaignData, setCampaignData] = useState([])
  const cardsPerPage = 5;
  useEffect(() => {
    const token = localStorage.getItem('access');

    fetch("http://127.0.0.1:8000/campaigns/mypage/participart/", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => response.json(
      console.log(response)
    ))
      .then(result => {
        console.log(result)
        const campaigns = result.map((campaign) => ({
          id: campaign.id,
          title: campaign.title,
          content: campaign.content,
          campaign_end_date: campaign.campaign_end_date,
          activity_start_date: campaign.activity_start_date,
          activity_end_date: campaign.activity_end_date,
          image: campaign.image,
          status: campaign.status
        }));
        setCampaignData(campaigns)
      })
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = campaignData.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <div className="mypage-block">
        <Sidebar /><div className="card-section">
          {currentCards.map((card, index) => (
            <div className="card" key={index}>
              <Link to={`/campaign/${card.id}`}>
                {card.image ? (
                  <img src={`http://localhost:8000${card.image}`} alt={card.title} style={{ width: '200px', height: '200px' }} />
                ) : (
                  <img src={campaign_default_image} alt="Default Campaign" style={{ width: '200px', height: '200px' }} />
                )}
              </Link>
              <Link to={`/campaign/${card.id}`}>
                <h3>{card.title}</h3>
              </Link>
              <p>캠페인 현황 : <span style={{ color: 'blue' }}>{statusMap[card.status]}</span></p>
              <p>캠페인 마감일: {card.campaign_end_date}</p>
              <p>활동 시작일 : {card.activity_start_date}</p>
              <p>활동 마감일 : {card.activity_start_date}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination-container">
        <Pagination
          count={Math.ceil(campaignData.length / cardsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </div>
    </>
  );
};


export { MyPostCampaign };