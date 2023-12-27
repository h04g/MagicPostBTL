import React from 'react';

const Status = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 bg-secondary">
            <div>
              <h2>Tình trạng các đơn hàng của bạn</h2>
            </div>
            <div class="input-group rounded">
              <input
                type="search"
                class="form-control rounded"
                placeholder="Tìm kiếm đơn hàng của bạn"
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <span class="input-group-text border-0" id="search-addon">
                <i class="fas fa-search"></i>
              </span>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Mã đơn hàng</th>
                  <th scope="col">Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Đang giao</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Đã giao</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Jacob</td>
                  <td>Đã giao</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Status;
