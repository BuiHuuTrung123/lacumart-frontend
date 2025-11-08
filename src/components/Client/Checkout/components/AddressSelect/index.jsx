// components/AddressSelect.jsx
import React from 'react'
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography
} from '@mui/material'
import { Controller } from 'react-hook-form';
// Dữ liệu địa chỉ tối giản nhưng đầy đủ
const VIETNAM_LOCATIONS = {
    cities: [
        { code: '01', name: 'Thành phố Hà Nội' },
        { code: '79', name: 'Thành phố Hồ Chí Minh' },
        { code: '48', name: 'Thành phố Đà Nẵng' },
        { code: '92', name: 'Thành phố Cần Thơ' },
        { code: '31', name: 'Thành phố Hải Phòng' }
    ],
    districts: {
        '01': [ // Hà Nội
            { code: '001', name: 'Quận Ba Đình' },
            { code: '005', name: 'Quận Cầu Giấy' },
            { code: '007', name: 'Quận Hai Bà Trưng' },
            { code: '021', name: 'Quận Hà Đông' },
            { code: '004', name: 'Quận Long Biên' }
        ],
        '79': [ // TP HCM
            { code: '760', name: 'Quận 1' },
            { code: '764', name: 'Quận Gò Vấp' },
            { code: '765', name: 'Quận Bình Thạnh' },
            { code: '766', name: 'Quận Tân Bình' },
            { code: '762', name: 'Quận Thủ Đức' }
        ],
        '48': [ // Đà Nẵng
            { code: '492', name: 'Quận Hải Châu' },
            { code: '493', name: 'Quận Sơn Trà' },
            { code: '494', name: 'Quận Ngũ Hành Sơn' },
            { code: '495', name: 'Quận Cẩm Lệ' },
            { code: '490', name: 'Quận Liên Chiểu' }
        ],
        '92': [ // Cần Thơ
            { code: '929', name: 'Quận Ninh Kiều' },
            { code: '931', name: 'Quận Bình Thủy' },
            { code: '932', name: 'Quận Cái Răng' },
            { code: '930', name: 'Quận Ô Môn' },
            { code: '934', name: 'Quận Thốt Nốt' }
        ],
        '31': [ // Hải Phòng
            { code: '303', name: 'Quận Hồng Bàng' },
            { code: '304', name: 'Quận Ngô Quyền' },
            { code: '305', name: 'Quận Lê Chân' },
            { code: '306', name: 'Quận Hải An' },
            { code: '307', name: 'Quận Kiến An' }
        ]
    },
    wards: {
        // Ba Đình - HN (5 phường)
        '001': [
            { code: '00001', name: 'Phường Phúc Xá' },
            { code: '00007', name: 'Phường Cống Vị' },
            { code: '00008', name: 'Phường Liễu Giai' },
            { code: '00013', name: 'Phường Quán Thánh' },
            { code: '00016', name: 'Phường Ngọc Hà' }
        ],
        // Cầu Giấy - HN (5 phường)
        '005': [
            { code: '00175', name: 'Phường Nghĩa Đô' },
            { code: '00178', name: 'Phường Nghĩa Tân' },
            { code: '00181', name: 'Phường Mai Dịch' },
            { code: '00184', name: 'Phường Dịch Vọng' },
            { code: '00187', name: 'Phường Quan Hoa' }
        ],
        // Hai Bà Trưng - HN (5 phường)
        '007': [
            { code: '00247', name: 'Phường Nguyễn Du' },
            { code: '00250', name: 'Phường Bạch Đằng' },
            { code: '00253', name: 'Phường Phạm Đình Hổ' },
            { code: '00256', name: 'Phường Lê Đại Hành' },
            { code: '00259', name: 'Phường Đồng Nhân' }
        ],
        // Hà Đông - HN (5 phường)
        '021': [
            { code: '00604', name: 'Phường Nguyễn Trãi' },
            { code: '00607', name: 'Phường Mộ Lao' },
            { code: '00608', name: 'Phường Văn Quán' },
            { code: '00610', name: 'Phường Vạn Phúc' },
            { code: '00613', name: 'Phường Yết Kiêu' }
        ],
        // Long Biên - HN (5 phường)
        '004': [
            { code: '00133', name: 'Phường Ngọc Lâm' },
            { code: '00136', name: 'Phường Phúc Lợi' },
            { code: '00139', name: 'Phường Bồ Đề' },
            { code: '00142', name: 'Phường Gia Thụy' },
            { code: '00145', name: 'Phường Long Biên' }
        ],
        // Quận 1 - HCM (5 phường)
        '760': [
            { code: '26701', name: 'Phường Tân Định' },
            { code: '26704', name: 'Phường Đa Kao' },
            { code: '26707', name: 'Phường Bến Nghé' },
            { code: '26710', name: 'Phường Bến Thành' },
            { code: '26713', name: 'Phường Nguyễn Thái Bình' }
        ],
        // Gò Vấp - HCM (5 phường)
        '764': [
            { code: '26869', name: 'Phường 1' },
            { code: '26872', name: 'Phường 3' },
            { code: '26875', name: 'Phường 4' },
            { code: '26878', name: 'Phường 5' },
            { code: '26881', name: 'Phường 6' }
        ],
        // Bình Thạnh - HCM (5 phường)
        '765': [
            { code: '26905', name: 'Phường 1' },
            { code: '26908', name: 'Phường 2' },
            { code: '26911', name: 'Phường 3' },
            { code: '26914', name: 'Phường 5' },
            { code: '26917', name: 'Phường 6' }
        ],
        // Tân Bình - HCM (5 phường)
        '766': [
            { code: '26968', name: 'Phường 1' },
            { code: '26971', name: 'Phường 2' },
            { code: '26974', name: 'Phường 3' },
            { code: '26977', name: 'Phường 4' },
            { code: '26980', name: 'Phường 5' }
        ],
        // Thủ Đức - HCM (5 phường)
        '762': [
            { code: '26800', name: 'Phường Linh Chiểu' },
            { code: '26803', name: 'Phường Linh Tây' },
            { code: '26806', name: 'Phường Linh Trung' },
            { code: '26809', name: 'Phường Bình Thọ' },
            { code: '26812', name: 'Phường Tam Bình' }
        ],
        // Hải Châu - Đà Nẵng (5 phường)
        '492': [
            { code: '20287', name: 'Phường Thạch Thang' },
            { code: '20290', name: 'Phường Thanh Bình' },
            { code: '20293', name: 'Phường Thuận Phước' },
            { code: '20296', name: 'Phường Hải Châu I' },
            { code: '20299', name: 'Phường Hải Châu II' }
        ],
        // Sơn Trà - Đà Nẵng (5 phường)
        '493': [
            { code: '20326', name: 'Phường Thọ Quang' },
            { code: '20329', name: 'Phường Nại Hiên Đông' },
            { code: '20332', name: 'Phường Mân Thái' },
            { code: '20335', name: 'Phường An Hải Bắc' },
            { code: '20338', name: 'Phường Phước Mỹ' }
        ],
        // Ngũ Hành Sơn - Đà Nẵng (5 phường)
        '494': [
            { code: '20341', name: 'Phường Mỹ An' },
            { code: '20344', name: 'Phường Khuê Mỹ' },
            { code: '20347', name: 'Phường Hoà Quý' },
            { code: '20350', name: 'Phường Hoà Hải' },
            { code: '20353', name: 'Phường Bắc Mỹ An' }
        ],
        // Cẩm Lệ - Đà Nẵng (5 phường)
        '495': [
            { code: '20356', name: 'Phường Khuê Trung' },
            { code: '20359', name: 'Phường Hòa Phát' },
            { code: '20362', name: 'Phường Hòa An' },
            { code: '20365', name: 'Phường Hòa Thọ Tây' },
            { code: '20368', name: 'Phường Hòa Thọ Đông' }
        ],
        // Liên Chiểu - Đà Nẵng (5 phường)
        '490': [
            { code: '20242', name: 'Phường Hòa Hiệp Bắc' },
            { code: '20243', name: 'Phường Hòa Hiệp Nam' },
            { code: '20245', name: 'Phường Hòa Khánh Bắc' },
            { code: '20246', name: 'Phường Hòa Khánh Nam' },
            { code: '20248', name: 'Phường Hòa Minh' }
        ],
        // Ninh Kiều - Cần Thơ (5 phường)
        '929': [
            { code: '31279', name: 'Phường Tân An' },
            { code: '31282', name: 'Phường Tân Bình' },
            { code: '31285', name: 'Phường Cái Khế' },
            { code: '31288', name: 'Phường An Hòa' },
            { code: '31291', name: 'Phường Thới Bình' }
        ],
        // Bình Thủy - Cần Thơ (5 phường)
        '931': [
            { code: '31318', name: 'Phường Bình Thủy' },
            { code: '31321', name: 'Phường Trà An' },
            { code: '31324', name: 'Phường Trà Nóc' },
            { code: '31327', name: 'Phường Thới An Đông' },
            { code: '31330', name: 'Phường An Thới' }
        ],
        // Cái Răng - Cần Thơ (5 phường)
        '932': [
            { code: '31333', name: 'Phường Ba Láng' },
            { code: '31336', name: 'Phường Hưng Phú' },
            { code: '31339', name: 'Phường Hưng Thạnh' },
            { code: '31342', name: 'Phường Lê Bình' },
            { code: '31345', name: 'Phường Phú Thứ' }
        ],
        // Ô Môn - Cần Thơ (5 phường)
        '930': [
            { code: '31306', name: 'Phường Châu Văn Liêm' },
            { code: '31309', name: 'Phường Thới Hòa' },
            { code: '31312', name: 'Phường Thới Long' },
            { code: '31315', name: 'Phường Long Hưng' },
            { code: '31317', name: 'Phường Thới An' }
        ],
        // Thốt Nốt - Cần Thơ (5 phường)
        '934': [
            { code: '31369', name: 'Phường Thốt Nốt' },
            { code: '31372', name: 'Phường Thới Thuận' },
            { code: '31375', name: 'Phường Vĩnh Bình' },
            { code: '31378', name: 'Phường Thuận An' },
            { code: '31381', name: 'Phường Tân Lộc' }
        ],
        // Hồng Bàng - Hải Phòng (5 phường)
        '303': [
            { code: '11257', name: 'Phường Quán Toan' },
            { code: '11260', name: 'Phường Hùng Vương' },
            { code: '11263', name: 'Phường Sở Dầu' },
            { code: '11266', name: 'Phường Thượng Lý' },
            { code: '11269', name: 'Phường Hạ Lý' }
        ],
        // Ngô Quyền - Hải Phòng (5 phường)
        '304': [
            { code: '11272', name: 'Phường Máy Chai' },
            { code: '11275', name: 'Phường Máy Tơ' },
            { code: '11278', name: 'Phường Vạn Mỹ' },
            { code: '11281', name: 'Phường Cầu Tre' },
            { code: '11284', name: 'Phường Lạc Viên' }
        ],
        // Lê Chân - Hải Phòng (5 phường)
        '305': [
            { code: '11287', name: 'Phường Cát Dài' },
            { code: '11290', name: 'Phường An Biên' },
            { code: '11293', name: 'Phường Lam Sơn' },
            { code: '11296', name: 'Phường An Dương' },
            { code: '11299', name: 'Phường Trần Nguyên Hãn' }
        ],
        // Hải An - Hải Phòng (5 phường)
        '306': [
            { code: '11329', name: 'Phường Đông Hải 1' },
            { code: '11330', name: 'Phường Đông Hải 2' },
            { code: '11332', name: 'Phường Đằng Lâm' },
            { code: '11335', name: 'Phường Thành Tô' },
            { code: '11338', name: 'Phường Đằng Hải' }
        ],
        // Kiến An - Hải Phòng (5 phường)
        '307': [
            { code: '11341', name: 'Phường Nam Sơn' },
            { code: '11344', name: 'Phường Tràng Minh' },
            { code: '11347', name: 'Phường Ngọc Sơn' },
            { code: '11350', name: 'Phường Trần Thành Ngọ' },
            { code: '11353', name: 'Phường Văn Đẩu' }
        ]
    }
};

// Helper functions
const LocationHelper = {
    getAllCities: () => VIETNAM_LOCATIONS.cities,

    getDistrictsByCity: (cityCode) => VIETNAM_LOCATIONS.districts[cityCode] || [],

    getWardsByDistrict: (districtCode) => VIETNAM_LOCATIONS.wards[districtCode] || [],

    findCityByCode: (code) => VIETNAM_LOCATIONS.cities.find(city => city.code === code),

    findDistrictByCode: (code) => {
        for (const cityCode in VIETNAM_LOCATIONS.districts) {
            const district = VIETNAM_LOCATIONS.districts[cityCode].find(d => d.code === code);
            if (district) return district;
        }
        return null;
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VIETNAM_LOCATIONS, LocationHelper };
}
const AddressSelect = ({
    register,
    errors,
    selectedCity,
    selectedDistrict,
    selectedWard,
    control
}) => {



    return (
        <>
            {/* Tỉnh/Thành phố */}
            <Grid item xs={12} md={4}>
                <FormControl fullWidth error={!!errors.city}>
                    <InputLabel>Tỉnh/Thành phố *</InputLabel>

                    <Controller
                        name="city"
                        control={control}
                        rules={{ required: 'Vui lòng chọn tỉnh/thành phố' }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Tỉnh/Thành phố *"
                                value={field.value || ''} // giữ sync với form
                                onChange={(e) => {
                                    field.onChange(e.target.value); // cập nhật React Hook Form
                                    // cập nhật state local nếu bạn có dùng
                                }}
                            >
                                {VIETNAM_LOCATIONS.cities.map((city) => (
                                    <MenuItem key={city.code} value={city.code}>
                                        {city.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />

                    {errors.city && (
                        <Typography variant="caption" color="error">
                            {errors.city.message}
                        </Typography>
                    )}
                </FormControl>
            </Grid>

            {/* Quận/Huyện */}
            <Grid item xs={12} md={4}>
                <FormControl fullWidth error={!!errors.district} disabled={!selectedCity}>
                    <InputLabel>Quận/Huyện *</InputLabel>
                    <Controller
                        name="district"
                        control={control}
                        rules={{ required: 'Vui lòng chọn tỉnh/thành phố' }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Quận/Huyện *"
                                value={field.value || ''}
                                onChange={(e) => {
                                    field.onChange(e.target.value); // cập nhật React Hook Form
                                    // cập nhật state local nếu bạn có dùng
                                }}
                            >
                                {selectedCity && VIETNAM_LOCATIONS.districts[selectedCity] ? (
                                    VIETNAM_LOCATIONS.districts[selectedCity].map((district) => (
                                        <MenuItem key={district.code} value={district.code}>
                                            {district.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem value="" disabled>
                                        Chọn tỉnh/thành phố trước
                                    </MenuItem>
                                )}
                            </Select>
                        )}
                    />

                    {
                        errors.district && (
                            <Typography variant="caption" color="error">
                                {errors.district.message}
                            </Typography>
                        )
                    }
                </FormControl>
            </Grid>

            {/* Phường/Xã */}
            <Grid item xs={12} md={4}>
                <FormControl fullWidth error={!!errors.ward} disabled={!selectedDistrict}>
                    <InputLabel>Phường/Xã *</InputLabel>
                    <Controller
                        name="ward"
                        control={control}
                        rules={{ required: 'Vui lòng chọn tỉnh/thành phố' }}
                        render={({ field }) => (
                            <Select
                                label="Phường/Xã *"
                                value={field.value || ''}
                                onChange={(e) => {
                                    field.onChange(e.target.value); // cập nhật React Hook Form
                                    // cập nhật state local nếu bạn có dùng
                                }}
                            >
                                {selectedDistrict && VIETNAM_LOCATIONS.wards[selectedDistrict] ? (
                                    VIETNAM_LOCATIONS.wards[selectedDistrict].map((ward) => (
                                        <MenuItem key={ward.code} value={ward.code}>
                                            {ward.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem value="" disabled>
                                        Chọn quận/huyện trước
                                    </MenuItem>
                                )}
                            </Select>
                        )}
                    />

                    {
                        errors.ward && (
                            <Typography variant="caption" color="error">
                                {errors.ward.message}
                            </Typography>
                        )
                    }
                </FormControl>
            </Grid>
        </>
    )
}

export default AddressSelect