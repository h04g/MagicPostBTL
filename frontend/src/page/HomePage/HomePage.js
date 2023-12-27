import React from 'react';

const HomePage = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3 ">
            <div>
              <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                <div class="container-fluid">
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavbar"
                  >
                    Điểm tập kết
                  </button>
                  <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                      <li class="nav-item dropdown">
                        <a
                          class="nav-link dropdown-toggle"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Điểm tập kết
                        </a>
                        <ul
                          class="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          <li>
                            <a class="dropdown-item" href="#">
                              Điểm tập kết 1
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#">
                              Điểm tập kết 2
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#">
                              Điểm tập kết 3
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div>
              <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                <div class="container-fluid">
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavbar"
                  >
                    Điểm tập kết
                  </button>
                  <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                      <li class="nav-item dropdown">
                        <a
                          class="nav-link dropdown-toggle"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Điểm giao dịch
                        </a>
                        <ul
                          class="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          <li>
                            <a class="dropdown-item" href="#">
                              Điểm giao dịch 1
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#">
                              Điểm giao dịch 2
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#">
                              Điểm giao dịch 3
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className="col-9 bg-secondary">
            <div>
              <h2>Tình trạng toàn hệ thống</h2>
            </div>
            <div class="row">
              <div class="col-sm-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Đã giao</h5>
                    <p class="card-text">1</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Đang giao</h5>
                    <p class="card-text">1</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Số hàng gửi</h5>
                    <p class="card-text">1</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Số hàng nhận </h5>
                    <p class="card-text">1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
