<?php

namespace App\Dto;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *      collectionOperations={
 *          "post"={
 *              "path"="/users/new-password",
 *          },
 *      },
 *      itemOperations={},
 * )
 */

final class NewPasswordRequest
{
    /**
     * @Assert\NotBlank(message="le code ne peut pas être vide")
     * @Assert\NotNull(message="le code ne peut pas être null")
     * @Assert\Length(min=6, max=1444)
     */
     public $password;
    /**
     * @Assert\NotBlank(message="le password ne peut pas être vide")
     * @Assert\NotNull(message="le code ne peut pas être null")
     * @Assert\EqualTo(propertyPath="password", message="les passwords sont différentes")
     * @Assert\Length(min=6, max=1444)
     */
    public $passwordConfirm;

    /**
     * @Assert\NotBlank(message="le code ne peut pas être vide")
     * @Assert\NotNull(message="le code ne peut pas être null")
     * @Assert\Type(type="integer", message="le code doit être entier")
     * @Assert\Length(min=6, max=6)
     */
    public $resetPasswordCode;

}