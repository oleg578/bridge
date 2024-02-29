<?php
/**
 * Class and Function List:
 * Function list:
 * - main()
 * Classes list:
 * - App extends \
 */

namespace Apps;

/**
 * Description of App
 *
 * @author Oleh Nahornyi
 *
 */
class App extends \Phalcon\Mvc\Application
{

    use \Services;

    public function main()
    {

        $this->_registerServices();

        $this->registerModules($this->config->modules->toArray());

        return $this;
    }
}
