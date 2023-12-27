import React from 'react';

const GatheringPoint = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3 "></div>
          <div className="col-9 bg-secondary">
            <div>
              <h2>Tình trạng điểm tập kết 1</h2>
            </div>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
            >
              Tạo đơn hàng
            </button>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Tạo đơn hàng
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">
                          Mã đơn hàng
                        </label>
                        <textarea
                          class="form-control"
                          id="message-text"
                        ></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Thông tin nguời nhận
                        </label>
                        <textarea
                          class="form-control"
                          id="message-text"
                        ></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Chuyển đến
                        </label>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
                            Điểm tập kết 1
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Điểm tập kết 2
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Send message
                    </button>
                  </div>
                </div>
              </div>
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

export default GatheringPoint;
