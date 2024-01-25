    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    contract Ktp {
        struct KtpDetail {
            string fullName;
            string placeOfBirth;
            uint256 birthDate;
            string gender;
        }

        mapping(bytes32 => KtpDetail) public datas; // Mapping untuk menyimpan Data berdasarkan NIK
        uint256 public totalDatas; // Jumlah total Data dalam Ktp
        address public admin; // Alamat administrator kontrak

        constructor() {
            admin = msg.sender; // Konstruktor untuk menginisialisasi administrator
        }

        modifier onlyAdmin() {
            require(msg.sender == admin, "Hanya admin yang dapat memanggil fungsi ini");
            _;
        }

        // Fungsi untuk menghasilkan NIK berdasarkan parameter yang diberikan
        function generateNIK(
            uint256 kodeProvinsi,
            uint256 kodeKota,
            uint256 kodeKecamatan,
            uint256 kodeTglLahir,
            uint256 kodeBlnLahir,
            uint256 kodeThnLahir,
            uint256 kodeUrut
        ) public pure returns (bytes32) {
            // Format NIK 16-digit
            bytes32 NIK = keccak256(abi.encodePacked(kodeProvinsi, kodeKota, kodeKecamatan, kodeTglLahir, kodeBlnLahir, kodeThnLahir, kodeUrut));
            return NIK;
        }

        // Fungsi untuk menambahkan Data baru ke dalam Ktp
        function addData(
            bytes32 NIK,
            string memory fullName,
            string memory placeOfBirth,
            uint256 birthDate,
            string memory gender
        ) public onlyAdmin {
            require(datas[NIK].birthDate == 0, "Data dengan NIK ini sudah ada");
            KtpDetail memory newData = KtpDetail(fullName, placeOfBirth, birthDate, gender);
            datas[NIK] = newData;
            totalDatas++;
        }

        // Fungsi untuk memperbarui detail Data berdasarkan NIK
        function updateData(
            bytes32 NIK,
            string memory newfullName,
            string memory newplaceOfBirth,
            uint256 newbirthDate,
            string memory newgender
        ) public onlyAdmin {
            require(datas[NIK].birthDate != 0, "Data dengan NIK ini tidak ditemukan");
            datas[NIK].fullName = newfullName;
            datas[NIK].placeOfBirth = newplaceOfBirth;
            datas[NIK].birthDate = newbirthDate;
            datas[NIK].gender = newgender;
        }

        // Fungsi untuk menghapus Data dari Ktp berdasarkan NIK
        function deleteData(bytes32 NIK) public onlyAdmin {
            require(datas[NIK].birthDate != 0, "Data dengan NIK ini tidak ditemukan");
            delete datas[NIK];
            totalDatas--;
        }
    }
