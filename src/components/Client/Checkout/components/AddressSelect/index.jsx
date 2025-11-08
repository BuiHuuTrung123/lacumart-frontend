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
            { code: '006', name: 'Quận Đống Đa' },
            { code: '007', name: 'Quận Hai Bà Trưng' },
            { code: '021', name: 'Quận Hà Đông' }
        ],
        '79': [ // TP HCM
            { code: '760', name: 'Quận 1' },
            { code: '761', name: 'Quận 12' },
            { code: '762', name: 'Quận Thủ Đức' },
            { code: '764', name: 'Quận Gò Vấp' },
            { code: '765', name: 'Quận Bình Thạnh' }
        ],
        '48': [ // Đà Nẵng
            { code: '490', name: 'Quận Liên Chiểu' },
            { code: '491', name: 'Quận Thanh Khê' },
            { code: '492', name: 'Quận Hải Châu' },
            { code: '493', name: 'Quận Sơn Trà' }
        ]
    },
    wards: {
        '001': [ // Ba Đình - HN
            { code: '00001', name: 'Phường Phúc Xá' },
            { code: '00007', name: 'Phường Cống Vị' },
            { code: '00008', name: 'Phường Liễu Giai' },
            { code: '00013', name: 'Phường Quán Thánh' }
        ],
        '760': [ // Quận 1 - HCM
            { code: '26701', name: 'Phường Tân Định' },
            { code: '26704', name: 'Phường Đa Kao' },
            { code: '26707', name: 'Phường Bến Nghé' },
            { code: '26710', name: 'Phường Bến Thành' }
        ],
        '764': [ // Gò Vấp - HCM
            { code: '26869', name: 'Phường 1' },
            { code: '26872', name: 'Phường 3' },
            { code: '26875', name: 'Phường 4' },
            { code: '26878', name: 'Phường 6' }
        ]
    }
}

const AddressSelect = ({
    register,
    errors,
    selectedCity,
    selectedDistrict,
    // onCityChange, 
    // onDistrictChange 
}) => {

    // const handleCityChange = (event) => {
    //     onCityChange(event.target.value)
    // }

    // const handleDistrictChange = (event) => {
    //     onDistrictChange(event.target.value)
    // }

    return (
        <>
            {/* Tỉnh/Thành phố */}
            <Grid item xs={12} md={4}>
                <FormControl fullWidth error={!!errors.city}>
                    <InputLabel>Tỉnh/Thành phố *</InputLabel>
                    <Select
                        {...register('city', { required: 'Vui lòng chọn tỉnh/thành phố' })}
                        label="Tỉnh/Thành phố *"
                        value={selectedCity || ''}
                    // onChange={handleCityChange}
                    >
                        {VIETNAM_LOCATIONS.cities.map((city) => (
                            <MenuItem key={city.code} value={city.code}>
                                {city.name}
                            </MenuItem>
                        ))}
                    </Select>
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
                    <Select

                        {...register('district', { required: 'Vui lòng chọn quận/huyện' })}
                        label="Quận/Huyện *"
                        value={selectedDistrict || ''}
                    // onChange={handleDistrictChange}
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
                    {errors.district && (
                        <Typography variant="caption" color="error">
                            {errors.district.message}
                        </Typography>
                    )}
                </FormControl>
            </Grid>

            {/* Phường/Xã */}
            <Grid item xs={12} md={4}>
                <FormControl fullWidth error={!!errors.ward} disabled={!selectedDistrict}>
                    <InputLabel>Phường/Xã *</InputLabel>
                    <Select
                        {...register('ward', { required: 'Vui lòng chọn phường/xã' })}
                        label="Phường/Xã *"
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
                    {errors.ward && (
                        <Typography variant="caption" color="error">
                            {errors.ward.message}
                        </Typography>
                    )}
                </FormControl>
            </Grid>
        </>
    )
}

export default AddressSelect