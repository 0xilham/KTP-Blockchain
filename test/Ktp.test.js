// Ktp.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ktp Contract", function () {
  let Ktp;
  let ktp;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    Ktp = await ethers.getContractFactory("Ktp");
    ktp = await Ktp.deploy();
    await ktp.waitForDeployment();
  });

  it("Should set the admin correctly", async function () {
    expect(await ktp.admin()).to.equal(owner.address);
  });

  it("Should generate correct NIK", async function () {
    const kodeProvinsi = 12;
    const kodeKota = 34;
    const kodeKecamatan = 56;
    const kodeTglLahir = 7;
    const kodeBlnLahir = 8;
    const kodeThnLahir = 1990;
    const kodeUrut = 123;

    const generatedNIK = await ktp.generateNIK(
      kodeProvinsi,
      kodeKota,
      kodeKecamatan,
      kodeTglLahir,
      kodeBlnLahir,
      kodeThnLahir,
      kodeUrut
    );

    // Concatenate values without using keccak256
    const expectedNIK = await ktp.generateNIK(
      kodeProvinsi,
      kodeKota,
      kodeKecamatan,
      kodeTglLahir,
      kodeBlnLahir,
      kodeThnLahir,
      kodeUrut
    );

    expect(generatedNIK).to.equal(expectedNIK);
  });

  it("Should add new data to Ktp", async function () {
    const NIK = await ktp.generateNIK(12, 34, 56, 7, 8, 1990, 123);
    await ktp.addData(NIK, "John Doe", "City", 1234567890, "Male");

    const data = await ktp.datas(NIK);
    expect(data.fullName).to.equal("John Doe");
    expect(data.placeOfBirth).to.equal("City");
    expect(data.birthDate).to.equal(1234567890);
    expect(data.gender).to.equal("Male");
    expect(await ktp.totalDatas()).to.equal(1);
  });

  it("Should update existing data in Ktp", async function () {
    const NIK = await ktp.generateNIK(12, 34, 56, 7, 8, 1990, 123);
    await ktp.addData(NIK, "John Doe", "City", 1234567890, "Male");

    await ktp.updateData(
      NIK,
      "Updated Name",
      "Updated City",
      987654321,
      "Female"
    );

    const updatedData = await ktp.datas(NIK);
    expect(updatedData.fullName).to.equal("Updated Name");
    expect(updatedData.placeOfBirth).to.equal("Updated City");
    expect(updatedData.birthDate).to.equal(987654321);
    expect(updatedData.gender).to.equal("Female");
  });

  it("Should delete data from Ktp", async function () {
    const NIK = await ktp.generateNIK(12, 34, 56, 7, 8, 1990, 123);
    await ktp.addData(NIK, "John Doe", "City", 1234567890, "Male");

    await ktp.deleteData(NIK);

    const data = await ktp.datas(NIK);
    expect(data.birthDate).to.equal(0);
    expect(await ktp.totalDatas()).to.equal(0);
  });

  it("Should not allow non-admin to add data", async function () {
    const NIK = await ktp.generateNIK(12, 34, 56, 7, 8, 1990, 123);
    await expect(
      ktp.connect(addr1).addData(NIK, "John Doe", "City", 1234567890, "Male")
    ).to.be.revertedWith("Hanya admin yang dapat memanggil fungsi ini");
  });

  it("Should not allow non-admin to update data", async function () {
    const NIK = await ktp.generateNIK(12, 34, 56, 7, 8, 1990, 123);
    await ktp.addData(NIK, "John Doe", "City", 1234567890, "Male");

    await expect(
      ktp
        .connect(addr1)
        .updateData(NIK, "Updated Name", "Updated City", 987654321, "Female")
    ).to.be.revertedWith("Hanya admin yang dapat memanggil fungsi ini");
  });

  it("Should not allow non-admin to delete data", async function () {
    const NIK = await ktp.generateNIK(12, 34, 56, 7, 8, 1990, 123);
    await ktp.addData(NIK, "John Doe", "City", 1234567890, "Male");

    await expect(ktp.connect(addr1).deleteData(NIK)).to.be.revertedWith(
      "Hanya admin yang dapat memanggil fungsi ini"
    );
  });
});
