public function post_confirm() {
    define('ANDROID2_CONFIG','default');
    define('AVAILABLE_NUMBER','0');
    define('ERROR0','0');
    define('ERROR1','1');
    define('ERROR2','2');
    define('ERROR3','3');
    define('IOS_CONFIG','honk.wav');
    define('OPEN','Open');
    define('PUSH_MESSAGE','Tu servicio ha sido confirmado!');
    define('SERVICE_ID','service_id');
    define('STATUS1','1');
    define('STATUS2','2');
    define('STATUS6','6');
    define('USER_TYPE_IPHONE','1');

    $id = Input::get('service_id');
    $service = Service::find($id);
    if ($service != NULL) {
        if ($service->status_id == STATUS6) {
            return Response::json(array('error' => ERROR2));
        }
        if ($service->driver_id == NULL && $service->status_id == STATUS1) {
            $service = Service::update($id, array(
                          'driver_id' => Input::get('driver_id'),
                          'status_id' => STATUS2
            ));
            Driver::update(Input::get('driver_id'), array(
                'available' => AVAILABLE_NUMBER
            ));
            $driverTmp = Driver::find(Input::get('driver_id'));
            Service::update($id, array(
                'car_id' => $driverTmp->car_id
            ));
            $service = Service::find($id);
            $push = Push::make();
            if ($service->user->uuid == '') {
                return Response::json(array('error' => ERROR0));
            }
            if ($service->user->type == USER_TYPE_IPHONE) {
                $result = $push->ios($service->user->uuid, PUSH_MESSAGE, 1, IOS_CONFIG, OPEN, array('service_id' => $service->id));
            } else {
                $result = $push->android2($service->user->uuid, PUSH_MESSAGE, 1, ANDROID2_CONFIG, OPEN, array('service_id' => $service->id));
            }
            return Response::json(array('error' => ERROR0));
        } else {
            return Response::json(array('error' => ERROR1));
        }
    } else {
        return Response::json(array('error' => ERROR3));
    }
}